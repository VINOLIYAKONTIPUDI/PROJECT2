const express = require("express")
const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const Vehicle = require("../models/Vehicle")
const auth = require("../middleware/auth")

const router = express.Router()

// Submit quiz results and get recommendations
router.post(
  "/submit",
  [
    body("answers").isObject().withMessage("Answers must be an object"),
    body("answers.1").notEmpty().withMessage("Primary use is required"),
    body("answers.2").notEmpty().withMessage("Vehicle size preference is required"),
    body("answers.3").notEmpty().withMessage("Budget range is required"),
    body("answers.4").isInt({ min: 1, max: 10 }).withMessage("Range importance must be 1-10"),
    body("answers.5").notEmpty().withMessage("Daily driving distance is required"),
    body("answers.8").isInt({ min: 1, max: 10 }).withMessage("Tech importance must be 1-10"),
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

      const { answers } = req.body
      const user = await User.findById(req.user.id)

      // Process answers and update user preferences
      const preferences = processQuizAnswers(answers)

      // Update user preferences
      user.preferences = { ...user.preferences, ...preferences }

      // Get vehicle recommendations
      const recommendations = await getVehicleRecommendations(preferences)

      // Save quiz results
      user.quizResults.push({
        answers,
        recommendations: recommendations.map((rec) => ({
          vehicleId: rec.vehicle._id,
          score: rec.score,
          matchReasons: rec.matchReasons,
        })),
      })

      await user.save()

      res.json({
        success: true,
        message: "Quiz completed successfully",
        data: {
          recommendations,
          userPreferences: preferences,
        },
      })
    } catch (error) {
      console.error("Quiz submission error:", error)
      res.status(500).json({
        success: false,
        message: "Failed to process quiz",
        error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
      })
    }
  },
)

// Get user's quiz history
router.get("/history", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("quizResults.recommendations.vehicleId", "make model year price.msrp images")
      .select("quizResults")

    res.json({
      success: true,
      data: {
        quizHistory: user.quizResults,
      },
    })
  } catch (error) {
    console.error("Get quiz history error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz history",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    })
  }
})

// Helper function to process quiz answers
function processQuizAnswers(answers) {
  const preferences = {}

  // Budget mapping
  const budgetMap = {
    "under-30k": { min: 0, max: 30000 },
    "30k-50k": { min: 30000, max: 50000 },
    "50k-70k": { min: 50000, max: 70000 },
    "70k-100k": { min: 70000, max: 100000 },
    "over-100k": { min: 100000, max: 500000 },
  }

  if (answers[3] && budgetMap[answers[3]]) {
    preferences.budget = budgetMap[answers[3]]
  }

  // Vehicle type mapping
  const vehicleTypeMap = {
    compact: "hatchback",
    sedan: "sedan",
    suv: "suv",
    truck: "truck",
    luxury: "sedan",
  }

  if (answers[2] && vehicleTypeMap[answers[2]]) {
    preferences.vehicleType = vehicleTypeMap[answers[2]]
  }

  // Range and tech importance
  if (answers[4]) {
    preferences.rangeImportance = Number.parseInt(answers[4])
  }

  if (answers[8]) {
    preferences.techImportance = Number.parseInt(answers[8])
  }

  // Charging features
  if (answers[6] && Array.isArray(answers[6])) {
    preferences.chargingFeatures = answers[6]
  }

  // Eco features
  if (answers[7] && Array.isArray(answers[7])) {
    preferences.ecoFeatures = answers[7]
  }

  return preferences
}

// Helper function to get vehicle recommendations
async function getVehicleRecommendations(preferences) {
  try {
    // Build filter based on preferences
    const filter = { isActive: true }

    // Budget filter
    if (preferences.budget) {
      filter["price.msrp"] = {
        $gte: preferences.budget.min,
        $lte: preferences.budget.max * 1.2, // Allow 20% over budget for better matches
      }
    }

    // Vehicle type filter (with some flexibility)
    const vehicleTypes = [preferences.vehicleType]
    if (preferences.vehicleType === "sedan") {
      vehicleTypes.push("hatchback")
    } else if (preferences.vehicleType === "suv") {
      vehicleTypes.push("wagon")
    }

    filter.bodyType = { $in: vehicleTypes }

    // Get vehicles
    const vehicles = await Vehicle.find(filter).limit(20)

    // Calculate match scores and reasons
    const recommendations = vehicles.map((vehicle) => {
      const score = calculateMatchScore(vehicle, preferences)
      const matchReasons = generateMatchReasons(vehicle, preferences)

      return {
        vehicle,
        score,
        matchReasons,
      }
    })

    // Sort by score and return top 5
    return recommendations.sort((a, b) => b.score - a.score).slice(0, 5)
  } catch (error) {
    console.error("Get recommendations error:", error)
    return []
  }
}

// Helper function to calculate match score
function calculateMatchScore(vehicle, preferences) {
  let score = 0

  // Budget matching (30 points)
  if (preferences.budget) {
    const effectivePrice =
      vehicle.price.msrp -
      (vehicle.price.incentives.federal + vehicle.price.incentives.state + vehicle.price.incentives.local)

    if (effectivePrice >= preferences.budget.min && effectivePrice <= preferences.budget.max) {
      score += 30
    } else if (effectivePrice < preferences.budget.min) {
      score += 20 // Good value
    } else if (effectivePrice <= preferences.budget.max * 1.1) {
      score += 15 // Slightly over budget
    }
  }

  // Vehicle type matching (25 points)
  if (vehicle.bodyType === preferences.vehicleType) {
    score += 25
  } else if (
    (preferences.vehicleType === "sedan" && vehicle.bodyType === "hatchback") ||
    (preferences.vehicleType === "suv" && vehicle.bodyType === "wagon")
  ) {
    score += 15 // Similar type
  }

  // Range importance (20 points)
  if (preferences.rangeImportance) {
    const rangeScore = Math.min((vehicle.specifications.range.epa / 300) * preferences.rangeImportance * 2, 20)
    score += rangeScore
  }

  // Technology importance (15 points)
  if (preferences.techImportance) {
    const techScore = (vehicle.techScore / 100) * preferences.techImportance * 1.5
    score += techScore
  }

  // Eco-friendliness (10 points)
  score += (vehicle.ecoScore / 100) * 10

  return Math.round(score)
}

// Helper function to generate match reasons
function generateMatchReasons(vehicle, preferences) {
  const reasons = []

  // Budget reasons
  if (preferences.budget) {
    const effectivePrice =
      vehicle.price.msrp -
      (vehicle.price.incentives.federal + vehicle.price.incentives.state + vehicle.price.incentives.local)

    if (effectivePrice <= preferences.budget.max) {
      reasons.push("Within budget")
    }

    if (effectivePrice < preferences.budget.min) {
      reasons.push("Great value")
    }
  }

  // Vehicle type reasons
  if (vehicle.bodyType === preferences.vehicleType) {
    reasons.push("Perfect size match")
  }

  // Range reasons
  if (vehicle.specifications.range.epa > 300) {
    reasons.push("Excellent range")
  }

  // Technology reasons
  if (vehicle.techScore > 90) {
    reasons.push("Advanced technology")
  }

  // Eco reasons
  if (vehicle.ecoScore > 90) {
    reasons.push("Eco-friendly")
  }

  // Charging reasons
  if (preferences.chargingFeatures && preferences.chargingFeatures.includes("fast-charging")) {
    if (vehicle.specifications.charging.dc_max_kw >= 150) {
      reasons.push("Fast charging")
    }
  }

  return reasons
}

module.exports = router
