const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Don't include password in queries by default
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerifiedAt: {
      type: Date,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    loginCount: { type: Number, default: 0 },
    preferences: {
      budget: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 100000 },
      },
      range: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 500 },
      },
      bodyTypes: [
        {
          type: String,
          enum: ["Sedan", "SUV", "Hatchback", "Coupe", "Truck", "Convertible"],
        },
      ],
      brands: [String],
      features: [String],
      chargingType: {
        type: String,
        enum: ["Level 1", "Level 2", "DC Fast", "Any"],
        default: "Any",
      },
      notifications: {
        email: { type: Boolean, default: true },
        priceAlerts: { type: Boolean, default: true },
        newModels: { type: Boolean, default: true },
        newsletter: { type: Boolean, default: false },
      },
    },
    stats: {
      viewedCount: { type: Number, default: 0 },
      favoritesCount: { type: Number, default: 0 },
      comparisonsCount: { type: Number, default: 0 },
      quizScore: { type: Number, min: 0, max: 100 },
    },
    favoriteVehicles: [
      {
        vehicleId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vehicle",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    viewHistory: [
      {
        vehicleId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vehicle",
        },
        viewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    searchHistory: [
      {
        query: String,
        filters: mongoose.Schema.Types.Mixed,
        searchedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    quizResults: [
      {
        score: { type: Number, min: 0, max: 100 },
        recommendations: [String],
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Index for better query performance
userSchema.index({ email: 1 })
userSchema.index({ isEmailVerified: 1 })
userSchema.index({ createdAt: -1 })
userSchema.index({ lastLogin: -1 })

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" },
  )
}

// Generate email verification token
userSchema.methods.generateEmailVerificationToken = function () {
  const crypto = require("crypto")
  const token = crypto.randomBytes(32).toString("hex")

  this.emailVerificationToken = crypto.createHash("sha256").update(token).digest("hex")

  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

  return token
}

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const crypto = require("crypto")
  const token = crypto.randomBytes(32).toString("hex")

  this.passwordResetToken = crypto.createHash("sha256").update(token).digest("hex")

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes

  return token
}

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

// Virtual for initials
userSchema.virtual("initials").get(function () {
  return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`.toUpperCase()
})

// Pre-save middleware to update stats
userSchema.pre("save", function (next) {
  if (this.isModified("favoriteVehicles")) {
    this.stats.favoritesCount = this.favoriteVehicles.length
  }
  next()
})

// Method to add vehicle to favorites
userSchema.methods.addToFavorites = function (vehicleId) {
  const existingFavorite = this.favoriteVehicles.find((fav) => fav.vehicleId.toString() === vehicleId.toString())

  if (!existingFavorite) {
    this.favoriteVehicles.push({ vehicleId })
    this.stats.favoritesCount = this.favoriteVehicles.length
  }

  return this.save()
}

// Method to remove vehicle from favorites
userSchema.methods.removeFromFavorites = function (vehicleId) {
  this.favoriteVehicles = this.favoriteVehicles.filter((fav) => fav.vehicleId.toString() !== vehicleId.toString())
  this.stats.favoritesCount = this.favoriteVehicles.length

  return this.save()
}

// Method to add to view history
userSchema.methods.addToViewHistory = function (vehicleId) {
  // Remove existing entry if it exists
  this.viewHistory = this.viewHistory.filter((view) => view.vehicleId.toString() !== vehicleId.toString())

  // Add to beginning of array
  this.viewHistory.unshift({ vehicleId })

  // Keep only last 50 views
  if (this.viewHistory.length > 50) {
    this.viewHistory = this.viewHistory.slice(0, 50)
  }

  this.stats.viewedCount = this.viewHistory.length

  return this.save()
}

// Method to update quiz results
userSchema.methods.updateQuizResults = function (score, recommendations) {
  this.quizResults.push({
    score,
    recommendations,
    completedAt: new Date(),
  })

  // Keep only last 10 quiz results
  if (this.quizResults.length > 10) {
    this.quizResults = this.quizResults.slice(-10)
  }

  // Update best score
  this.stats.quizScore = Math.max(this.stats.quizScore || 0, score)

  return this.save()
}

// Transform output
userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  delete user.emailVerificationToken
  delete user.emailVerificationExpires
  delete user.passwordResetToken
  delete user.passwordResetExpires
  return user
}

module.exports = mongoose.model("User", userSchema)
