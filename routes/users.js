const express = require("express")
const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          preferences: user.preferences,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
        },
      },
    })
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put(
  "/profile",
  [
    auth,
    body("firstName").optional().trim().isLength({ min: 2 }).withMessage("First name must be at least 2 characters"),
    body("lastName").optional().trim().isLength({ min: 2 }).withMessage("Last name must be at least 2 characters"),
    body("email").optional().isEmail().normalizeEmail().withMessage("Please provide a valid email"),
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

      const { firstName, lastName, email } = req.body
      const user = await User.findById(req.user.userId)

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      // Check if email is being changed and if it already exists
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          })
        }
        user.email = email
        user.isEmailVerified = false // Reset email verification if email changes
      }

      if (firstName) user.firstName = firstName
      if (lastName) user.lastName = lastName

      await user.save()

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
            preferences: user.preferences,
          },
        },
      })
    } catch (error) {
      console.error("Update profile error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get("/stats", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // In a real application, you would calculate these from actual user activity
    // For now, we'll return sample data
    const stats = {
      viewedCount: user.stats?.viewedCount || Math.floor(Math.random() * 50) + 10,
      favoritesCount: user.stats?.favoritesCount || Math.floor(Math.random() * 10) + 1,
      comparisonsCount: user.stats?.comparisonsCount || Math.floor(Math.random() * 15) + 3,
      quizScore: user.stats?.quizScore || Math.floor(Math.random() * 30) + 70,
    }

    res.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error("Get stats error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   GET /api/users/activity
// @desc    Get user activity feed
// @access  Private
router.get("/activity", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // In a real application, you would fetch actual user activity from a database
    // For now, we'll return sample activity data
    const activities = [
      {
        type: "view",
        text: "Viewed Tesla Model 3",
        time: "2 hours ago",
        icon: "fas fa-eye",
        color: "green",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        type: "favorite",
        text: "Added BMW i4 to favorites",
        time: "1 day ago",
        icon: "fas fa-heart",
        color: "blue",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        type: "compare",
        text: "Compared 3 vehicles",
        time: "2 days ago",
        icon: "fas fa-balance-scale",
        color: "purple",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        type: "quiz",
        text: "Completed EV matching quiz",
        time: "3 days ago",
        icon: "fas fa-question-circle",
        color: "orange",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        type: "charging",
        text: "Found charging stations nearby",
        time: "1 week ago",
        icon: "fas fa-bolt",
        color: "green",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    ]

    res.json({
      success: true,
      data: activities,
    })
  } catch (error) {
    console.error("Get activity error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   POST /api/users/activity
// @desc    Track user activity
// @access  Private
router.post(
  "/activity",
  [
    auth,
    body("type").exists().withMessage("Activity type is required"),
    body("itemId").optional().isMongoId().withMessage("Invalid item ID"),
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

      const { type, itemId } = req.body
      const user = await User.findById(req.user.userId)

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      // In a real application, you would save this activity to a database
      // For now, we'll just acknowledge the tracking
      console.log(`User ${user._id} performed activity: ${type} on item: ${itemId}`)

      res.json({
        success: true,
        message: "Activity tracked successfully",
      })
    } catch (error) {
      console.error("Track activity error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put(
  "/preferences",
  [auth, body("preferences").isObject().withMessage("Preferences must be an object")],
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

      const { preferences } = req.body
      const user = await User.findById(req.user.userId)

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }

      // Merge new preferences with existing ones
      user.preferences = { ...user.preferences, ...preferences }
      await user.save()

      res.json({
        success: true,
        message: "Preferences updated successfully",
        data: {
          preferences: user.preferences,
        },
      })
    } catch (error) {
      console.error("Update preferences error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   DELETE /api/users/account
// @desc    Delete user account
// @access  Private
router.delete("/account", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // In a real application, you might want to soft delete or archive the account
    await User.findByIdAndDelete(req.user.userId)

    res.json({
      success: true,
      message: "Account deleted successfully",
    })
  } catch (error) {
    console.error("Delete account error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

module.exports = router
