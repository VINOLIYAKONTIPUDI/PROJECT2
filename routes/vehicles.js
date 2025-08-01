const express = require("express")
const { query, param, body, validationResult } = require("express-validator")
const Vehicle = require("../models/Vehicle")
const auth = require("../middleware/auth")
const optionalAuth = require("../middleware/optionalAuth")

const router = express.Router()

// Get all vehicles with filtering and pagination
router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
    query("make").optional().isString().trim(),
    query("bodyType").optional().isIn(["sedan", "suv", "hatchback", "coupe", "truck", "wagon", "convertible"]),
    query("minPrice").optional().isFloat({ min: 0 }).withMessage("Min price must be non-negative"),
    query("maxPrice").optional().isFloat({ min: 0 }).withMessage("Max price must be non-negative"),
    query("minRange").optional().isInt({ min: 0 }).withMessage("Min range must be non-negative"),
    query("maxRange").optional().isInt({ min: 0 }).withMessage("Max range must be non-negative"),
    query("sortBy").optional().isIn(["price", "range", "rating", "name", "year"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
      }

      const {
        page = 1,
        limit = 20,
        make,
        bodyType,
        minPrice,
        maxPrice,
        minRange,
        maxRange,
        sortBy = "name",
        sortOrder = "asc",
        search,
      } = req.query

      // Build filter object
      const filter = { isActive: true }

      if (make) {
        filter.make = new RegExp(make, "i")
      }

      if (bodyType) {
        filter.bodyType = bodyType
      }

      if (minPrice || maxPrice) {
        filter["price.msrp"] = {}
        if (minPrice) filter["price.msrp"].$gte = Number.parseFloat(minPrice)
        if (maxPrice) filter["price.msrp"].$lte = Number.parseFloat(maxPrice)
      }

      if (minRange || maxRange) {
        filter["specifications.range.epa"] = {}
        if (minRange) filter["specifications.range.epa"].$gte = Number.parseInt(minRange)
        if (maxRange) filter["specifications.range.epa"].$lte = Number.parseInt(maxRange)
      }

      if (search) {
        filter.$or = [
          { make: new RegExp(search, "i") },
          { model: new RegExp(search, "i") },
          { "features.standard": new RegExp(search, "i") },
          { "features.optional": new RegExp(search, "i") },
        ]
      }

      // Build sort object
      const sort = {}
      switch (sortBy) {
        case "price":
          sort["price.msrp"] = sortOrder === "desc" ? -1 : 1
          break
        case "range":
          sort["specifications.range.epa"] = sortOrder === "desc" ? -1 : 1
          break
        case "rating":
          sort["ratings.overall"] = sortOrder === "desc" ? -1 : 1
          break
        case "year":
          sort.year = sortOrder === "desc" ? -1 : 1
          break
        default:
          sort.make = sortOrder === "desc" ? -1 : 1
          sort.model = sortOrder === "desc" ? -1 : 1
      }

      // Execute query with pagination
      const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

      const [vehicles, total] = await Promise.all([
        Vehicle.find(filter).sort(sort).skip(skip).limit(Number.parseInt(limit)).select("-metadata -__v"),
        Vehicle.countDocuments(filter),
      ])

      const totalPages = Math.ceil(total / Number.parseInt(limit))

      res.json({
        success: true,
        data: {
          vehicles,
          pagination: {
            currentPage: Number.parseInt(page),
            totalPages,
            totalItems: total,
            itemsPerPage: Number.parseInt(limit),
            hasNextPage: Number.parseInt(page) < totalPages,
            hasPrevPage: Number.parseInt(page) > 1,
          },
        },
      })
    } catch (error) {
      console.error("Get vehicles error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to fetch vehicles",
        error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
      })
    }
  },
)

// Get vehicle by ID
router.get("/:id", [param("id").isMongoId().withMessage("Invalid vehicle ID")], optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const vehicle = await Vehicle.findById(req.params.id)

    if (!vehicle || !vehicle.isActive) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      })
    }

    // Increment view count
    await vehicle.incrementViews()

    // Calculate match score if user is authenticated
    let matchScore = null
    if (req.user) {
      const User = require("../models/User")
      const user = await User.findById(req.user.id)
      if (user && user.preferences) {
        matchScore = vehicle.calculateMatchScore(user.preferences)
      }
    }

    res.json({
      success: true,
      data: {
        vehicle,
        matchScore,
      },
    })
  } catch (error) {
    console.error("Get vehicle error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicle",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    })
  }
})

// Get vehicle recommendations for user
router.get("/recommendations/for-me", auth, async (req, res) => {
  try {
    const User = require("../models/User")
    const user = await User.findById(req.user.id)

    if (!user || !user.preferences) {
      return res.status(400).json({
        success: false,
        message: "User preferences not found. Please complete the quiz first.",
      })
    }

    // Build filter based on user preferences
    const filter = { isActive: true }

    // Budget filter
    if (user.preferences.budget) {
      filter["price.msrp"] = {
        $gte: user.preferences.budget.min,
        $lte: user.preferences.budget.max,
      }
    }

    // Vehicle type filter
    if (user.preferences.vehicleType) {
      filter.bodyType = user.preferences.vehicleType
    }

    // Get vehicles and calculate match scores
    const vehicles = await Vehicle.find(filter).limit(10)

    const recommendations = vehicles
      .map((vehicle) => ({
        vehicle,
        matchScore: vehicle.calculateMatchScore(user.preferences),
        matchReasons: [], // This would be populated based on matching criteria
      }))
      .sort((a, b) => b.matchScore - a.matchScore)

    res.json({
      success: true,
      data: {
        recommendations: recommendations.slice(0, 5),
        userPreferences: user.preferences,
      },
    })
  } catch (error) {
    console.error("Get recommendations error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get recommendations",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    })
  }
})

// Add vehicle to favorites
router.post("/:id/favorite", [param("id").isMongoId().withMessage("Invalid vehicle ID")], auth, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const vehicleId = req.params.id

    // Check if vehicle exists
    const vehicle = await Vehicle.findById(vehicleId)
    if (!vehicle || !vehicle.isActive) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      })
    }

    const User = require("../models/User")
    const user = await User.findById(req.user.id)

    // Check if already favorited
    if (user.favoriteVehicles.includes(vehicleId)) {
      return res.status(400).json({
        success: false,
        message: "Vehicle already in favorites",
      })
    }

    // Add to favorites
    user.favoriteVehicles.push(vehicleId)
    await user.save()

    // Update vehicle favorites count
    vehicle.metadata.favorites += 1
    await vehicle.save()

    res.json({
      success: true,
      message: "Vehicle added to favorites",
    })
  } catch (error) {
    console.error("Add favorite error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to add vehicle to favorites",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    })
  }
})

// Remove vehicle from favorites
router.delete("/:id/favorite", [param("id").isMongoId().withMessage("Invalid vehicle ID")], auth, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const vehicleId = req.params.id

    const User = require("../models/User")
    const user = await User.findById(req.user.id)

    // Check if in favorites
    if (!user.favoriteVehicles.includes(vehicleId)) {
      return res.status(400).json({
        success: false,
        message: "Vehicle not in favorites",
      })
    }

    // Remove from favorites
    user.favoriteVehicles = user.favoriteVehicles.filter((id) => id.toString() !== vehicleId)
    await user.save()

    // Update vehicle favorites count
    const vehicle = await Vehicle.findById(vehicleId)
    if (vehicle) {
      vehicle.metadata.favorites = Math.max(0, vehicle.metadata.favorites - 1)
      await vehicle.save()
    }

    res.json({
      success: true,
      message: "Vehicle removed from favorites",
    })
  } catch (error) {
    console.error("Remove favorite error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to remove vehicle from favorites",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    })
  }
})

// Get popular vehicles
router.get("/popular/trending", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ isActive: true })
      .sort({ "metadata.views": -1, "ratings.overall": -1 })
      .limit(6)
      .select("make model year price.msrp specifications.range.epa ratings images")

    res.json({
      success: true,
      data: { vehicles },
    })
  } catch (error) {
    console.error("Get popular vehicles error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch popular vehicles",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    })
  }
})

module.exports = router
