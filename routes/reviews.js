const express = require("express")
const { body, param, query, validationResult } = require("express-validator")
const Review = require("../models/Review")
const Vehicle = require("../models/Vehicle")
const auth = require("../middleware/auth")

const router = express.Router()

// Get reviews for a vehicle
router.get(
  "/vehicle/:vehicleId",
  [
    param("vehicleId").isMongoId().withMessage("Invalid vehicle ID"),
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be positive"),
    query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("Limit must be 1-50"),
    query("sortBy").optional().isIn(["createdAt", "helpful_votes", "ratings.overall"]),
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

      const { vehicleId } = req.params

      const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" } = req.query

      // Check if vehicle exists
      const vehicle = await Vehicle.findById(vehicleId)
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        })
      }

      // Build sort object
      const sort = {}
      sort[sortBy] = sortOrder === "desc" ? -1 : 1

      const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

      const [reviews, total] = await Promise.all([
        Review.find({ vehicle: vehicleId, isActive: true })
          .populate("user", "firstName lastName avatar")
          .sort(sort)
          .skip(skip)
          .limit(Number.parseInt(limit)),
        Review.countDocuments({ vehicle: vehicleId, isActive: true }),
      ])

      const totalPages = Math.ceil(total / Number.parseInt(limit))

      res.json({
        success: true,
        data: {
          reviews,
          pagination: {
            currentPage: Number.parseInt(page),
            totalPages,
            totalItems: total,
            itemsPerPage: Number.parseInt(limit),
          },
        },
      })
    } catch (error) {
      console.error("Get reviews error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to fetch reviews",
        error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
      })
    }
  },
)

// Create a review
router.post(
  "/",
  [
    body("vehicle").isMongoId().withMessage("Valid vehicle ID is required"),
    body("ratings.overall").isInt({ min: 1, max: 5 }).withMessage("Overall rating must be 1-5"),
    body("ratings.range").optional().isInt({ min: 1, max: 5 }).withMessage("Range rating must be 1-5"),
    body("ratings.charging").optional().isInt({ min: 1, max: 5 }).withMessage("Charging rating must be 1-5"),
    body("ratings.technology").optional().isInt({ min: 1, max: 5 }).withMessage("Technology rating must be 1-5"),
    body("ratings.comfort").optional().isInt({ min: 1, max: 5 }).withMessage("Comfort rating must be 1-5"),
    body("ratings.value").optional().isInt({ min: 1, max: 5 }).withMessage("Value rating must be 1-5"),
    body("title").trim().isLength({ min: 5, max: 100 }).withMessage("Title must be 5-100 characters"),
    body("content").trim().isLength({ min: 50, max: 2000 }).withMessage("Content must be 50-2000 characters"),
    body("pros").optional().isArray({ max: 10 }).withMessage("Maximum 10 pros allowed"),
    body("cons").optional().isArray({ max: 10 }).withMessage("Maximum 10 cons allowed"),
    body("ownership.duration_months").optional().isInt({ min: 0 }).withMessage("Duration must be non-negative"),
    body("ownership.mileage").optional().isInt({ min: 0 }).withMessage("Mileage must be non-negative"),
    body("ownership.usage_type")
      .optional()
      .isIn(["daily_commute", "weekend_trips", "long_distance", "city_driving", "mixed"]),
  ],
  auth,
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

      const { vehicle, ratings, title, content, pros, cons, ownership } = req.body

      // Check if vehicle exists
      const vehicleDoc = await Vehicle.findById(vehicle)
      if (!vehicleDoc) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        })
      }

      // Check if user already reviewed this vehicle
      const existingReview = await Review.findOne({
        user: req.user.id,
        vehicle: vehicle,
      })

      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: "You have already reviewed this vehicle",
        })
      }

      // Create review
      const review = new Review({
        user: req.user.id,
        vehicle,
        ratings,
        title,
        content,
        pros: pros || [],
        cons: cons || [],
        ownership: ownership || {},
      })

      await review.save()

      // Populate user data for response
      await review.populate("user", "firstName lastName avatar")

      res.status(201).json({
        success: true,
        message: "Review created successfully",
        data: { review },
      })
    } catch (error) {
      console.error("Create review error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to create review",
        error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
      })
    }
  },
)

// Update a review
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid review ID"),
    body("ratings.overall").isInt({ min: 1, max: 5 }).withMessage("Overall rating must be 1-5"),
    body("title").trim().isLength({ min: 5, max: 100 }).withMessage("Title must be 5-100 characters"),
    body("content").trim().isLength({ min: 50, max: 2000 }).withMessage("Content must be 50-2000 characters"),
  ],
  auth,
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

      const review = await Review.findById(req.params.id)

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        })
      }

      // Check if user owns the review
      if (review.user.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this review",
        })
      }

      // Update review
      const { ratings, title, content, pros, cons, ownership } = req.body

      review.ratings = ratings
      review.title = title
      review.content = content
      if (pros) review.pros = pros
      if (cons) review.cons = cons
      if (ownership) review.ownership = { ...review.ownership, ...ownership }

      await review.save()
      await review.populate("user", "firstName lastName avatar")

      res.json({
        success: true,
        message: "Review updated successfully",
        data: { review },
      })
    } catch (error) {
      console.error("Update review error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to update review",
        error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
      })
    }
  },
)

// Delete a review
router.delete("/:id", [param("id").isMongoId().withMessage("Invalid review ID")], auth, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const review = await Review.findById(req.params.id)

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      })
    }

    // Check if user owns the review or is admin
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this review",
      })
    }

    // Soft delete
    review.isActive = false
    await review.save()

    res.json({
      success: true,
      message: "Review deleted successfully",
    })
  } catch (error) {
    console.error("Delete review error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    })
  }
})

// Vote helpful on a review
router.post("/:id/helpful", [param("id").isMongoId().withMessage("Invalid review ID")], auth, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      })
    }

    const review = await Review.findById(req.params.id)

    if (!review || !review.isActive) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      })
    }

    // Increment helpful votes
    review.helpful_votes += 1
    await review.save()

    res.json({
      success: true,
      message: "Vote recorded",
      data: {
        helpful_votes: review.helpful_votes,
      },
    })
  } catch (error) {
    console.error("Vote helpful error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to record vote",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    })
  }
})

module.exports = router
