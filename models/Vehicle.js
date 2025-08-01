const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, "Vehicle make is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Vehicle model is required"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Vehicle year is required"],
      min: [2010, "Year must be 2010 or later"],
      max: [new Date().getFullYear() + 2, "Year cannot be more than 2 years in the future"],
    },
    price: {
      msrp: {
        type: Number,
        required: [true, "MSRP is required"],
        min: [0, "Price cannot be negative"],
      },
      incentives: {
        federal: { type: Number, default: 0 },
        state: { type: Number, default: 0 },
        local: { type: Number, default: 0 },
      },
    },
    specifications: {
      range: {
        epa: { type: Number, required: true },
        wltp: { type: Number },
        real_world: { type: Number },
      },
      efficiency: {
        mpge_city: { type: Number, required: true },
        mpge_highway: { type: Number, required: true },
        mpge_combined: { type: Number, required: true },
        kwh_per_100mi: { type: Number, required: true },
      },
      battery: {
        capacity_kwh: { type: Number, required: true },
        chemistry: { type: String, enum: ["LFP", "NCM", "NCA", "LTO"] },
        warranty_years: { type: Number, default: 8 },
        warranty_miles: { type: Number, default: 100000 },
      },
      charging: {
        ac_max_kw: { type: Number, required: true },
        dc_max_kw: { type: Number, required: true },
        charge_port: { type: String, enum: ["CCS", "CHAdeMO", "Tesla", "Type2"] },
        time_10_80_minutes: { type: Number },
      },
      performance: {
        acceleration_0_60: { type: Number },
        top_speed_mph: { type: Number },
        horsepower: { type: Number },
        torque_lb_ft: { type: Number },
        drivetrain: { type: String, enum: ["FWD", "RWD", "AWD"] },
      },
      dimensions: {
        length_inches: { type: Number },
        width_inches: { type: Number },
        height_inches: { type: Number },
        wheelbase_inches: { type: Number },
        ground_clearance_inches: { type: Number },
        cargo_volume_cubic_feet: { type: Number },
        seating_capacity: { type: Number, required: true },
      },
    },
    bodyType: {
      type: String,
      required: true,
      enum: ["sedan", "suv", "hatchback", "coupe", "truck", "wagon", "convertible"],
    },
    features: {
      standard: [String],
      optional: [String],
      safety: [String],
      technology: [String],
      comfort: [String],
    },
    images: [
      {
        url: { type: String, required: true },
        alt: String,
        type: { type: String, enum: ["exterior", "interior", "detail"], default: "exterior" },
      },
    ],
    availability: {
      status: {
        type: String,
        enum: ["available", "coming_soon", "discontinued"],
        default: "available",
      },
      regions: [String],
      expected_delivery_weeks: { type: Number, default: 4 },
    },
    ratings: {
      overall: { type: Number, min: 0, max: 5, default: 0 },
      range: { type: Number, min: 0, max: 5, default: 0 },
      charging: { type: Number, min: 0, max: 5, default: 0 },
      technology: { type: Number, min: 0, max: 5, default: 0 },
      comfort: { type: Number, min: 0, max: 5, default: 0 },
      value: { type: Number, min: 0, max: 5, default: 0 },
      review_count: { type: Number, default: 0 },
    },
    ecoScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 85,
    },
    techScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 75,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    metadata: {
      views: { type: Number, default: 0 },
      favorites: { type: Number, default: 0 },
      comparisons: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
vehicleSchema.index({ make: 1, model: 1, year: 1 })
vehicleSchema.index({ bodyType: 1 })
vehicleSchema.index({ "price.msrp": 1 })
vehicleSchema.index({ "specifications.range.epa": 1 })
vehicleSchema.index({ "ratings.overall": -1 })
vehicleSchema.index({ isActive: 1 })

// Virtual for effective price after incentives
vehicleSchema.virtual("effectivePrice").get(function () {
  const totalIncentives = this.price.incentives.federal + this.price.incentives.state + this.price.incentives.local
  return Math.max(0, this.price.msrp - totalIncentives)
})

// Virtual for full name
vehicleSchema.virtual("fullName").get(function () {
  return `${this.year} ${this.make} ${this.model}`
})

// Method to increment view count
vehicleSchema.methods.incrementViews = function () {
  this.metadata.views += 1
  return this.save()
}

// Method to calculate match score for a user
vehicleSchema.methods.calculateMatchScore = function (userPreferences) {
  let score = 0

  // Budget matching (30 points)
  const effectivePrice = this.effectivePrice
  if (effectivePrice >= userPreferences.budget.min && effectivePrice <= userPreferences.budget.max) {
    score += 30
  } else if (effectivePrice < userPreferences.budget.min) {
    score += 20 // Good value
  }

  // Vehicle type matching (25 points)
  if (this.bodyType === userPreferences.vehicleType) {
    score += 25
  }

  // Range importance (20 points)
  const rangeScore = Math.min((this.specifications.range.epa / 300) * userPreferences.rangeImportance * 2, 20)
  score += rangeScore

  // Technology importance (15 points)
  const techScore = (this.techScore / 100) * userPreferences.techImportance * 1.5
  score += techScore

  // Eco-friendliness (10 points)
  score += (this.ecoScore / 100) * 10

  return Math.round(score)
}

module.exports = mongoose.model("Vehicle", vehicleSchema)
