const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    ratings: {
      overall: {
        type: Number,
        required: [true, "Overall rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
      },
      range: {
        type: Number,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
      },
      charging: {
        type: Number,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
      },
      technology: {
        type: Number,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
      },
      comfort: {
        type: Number,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
      },
      value: {
        type: Number,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
      },
    },
    title: {
      type: String,
      required: [true, "Review title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Review content is required"],
      trim: true,
      minlength: [50, "Review must be at least 50 characters"],
      maxlength: [2000, "Review cannot exceed 2000 characters"],
    },
    pros: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Pro cannot exceed 200 characters"],
      },
    ],
    cons: [
      {
        type: String,
        trim: true,
        maxlength: [200, "Con cannot exceed 200 characters"],
      },
    ],
    ownership: {
      duration_months: {
        type: Number,
        min: [0, "Duration cannot be negative"],
      },
      mileage: {
        type: Number,
        min: [0, "Mileage cannot be negative"],
      },
      usage_type: {
        type: String,
        enum: ["daily_commute", "weekend_trips", "long_distance", "city_driving", "mixed"],
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    helpful_votes: {
      type: Number,
      default: 0,
    },
    reported: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
reviewSchema.index({ vehicle: 1, createdAt: -1 })
reviewSchema.index({ user: 1 })
reviewSchema.index({ "ratings.overall": -1 })
reviewSchema.index({ verified: 1 })

// Prevent duplicate reviews from same user for same vehicle
reviewSchema.index({ user: 1, vehicle: 1 }, { unique: true })

// Virtual for average rating
reviewSchema.virtual("averageRating").get(function () {
  const ratings = this.ratings
  const ratingValues = [
    ratings.overall,
    ratings.range,
    ratings.charging,
    ratings.technology,
    ratings.comfort,
    ratings.value,
  ].filter((rating) => rating != null)

  return ratingValues.length > 0 ? ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length : 0
})

// Static method to calculate vehicle ratings
reviewSchema.statics.calculateVehicleRatings = async function (vehicleId) {
  const Vehicle = mongoose.model("Vehicle")

  const stats = await this.aggregate([
    { $match: { vehicle: vehicleId, isActive: true } },
    {
      $group: {
        _id: null,
        overall: { $avg: "$ratings.overall" },
        range: { $avg: "$ratings.range" },
        charging: { $avg: "$ratings.charging" },
        technology: { $avg: "$ratings.technology" },
        comfort: { $avg: "$ratings.comfort" },
        value: { $avg: "$ratings.value" },
        count: { $sum: 1 },
      },
    },
  ])

  if (stats.length > 0) {
    const ratings = stats[0]
    await Vehicle.findByIdAndUpdate(vehicleId, {
      "ratings.overall": Math.round(ratings.overall * 10) / 10,
      "ratings.range": Math.round(ratings.range * 10) / 10,
      "ratings.charging": Math.round(ratings.charging * 10) / 10,
      "ratings.technology": Math.round(ratings.technology * 10) / 10,
      "ratings.comfort": Math.round(ratings.comfort * 10) / 10,
      "ratings.value": Math.round(ratings.value * 10) / 10,
      "ratings.review_count": ratings.count,
    })
  }
}

// Post-save middleware to update vehicle ratings
reviewSchema.post("save", async function () {
  await this.constructor.calculateVehicleRatings(this.vehicle)
})

// Post-remove middleware to update vehicle ratings
reviewSchema.post("remove", async function () {
  await this.constructor.calculateVehicleRatings(this.vehicle)
})

module.exports = mongoose.model("Review", reviewSchema)
