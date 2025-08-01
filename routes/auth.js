const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const auth = require("../middleware/auth")
const sendEmail = require("../utils/sendEmail")

const router = express.Router()

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  "/register",
  [
    body("firstName").trim().isLength({ min: 2 }).withMessage("First name must be at least 2 characters"),
    body("lastName").trim().isLength({ min: 2 }).withMessage("Last name must be at least 2 characters"),
    body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage("Password must contain uppercase, lowercase, number, and special character"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
      }

      const { firstName, lastName, email, password } = req.body

      // Check if user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        })
      }

      // Hash password
      const salt = await bcrypt.genSalt(12)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Create user
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isEmailVerified: false,
      })

      await user.save()

      // Generate email verification token
      const verificationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" })

      // Send verification email
      try {
        await sendEmail({
          to: email,
          subject: "Verify Your EVMatch Account",
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">Welcome to EVMatch!</h2>
            <p>Hi ${firstName},</p>
            <p>Thank you for joining EVMatch. Please verify your email address by clicking the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}" 
                 style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #6b7280;">${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}</p>
            <p>This link will expire in 24 hours.</p>
            <p>Best regards,<br>The EVMatch Team</p>
          </div>
        `,
        })
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError)
        // Don't fail registration if email fails
      }

      res.status(201).json({
        success: true,
        message: "User registered successfully. Please check your email to verify your account.",
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
          },
        },
      })
    } catch (error) {
      console.error("Registration error:", error)
      res.status(500).json({
        success: false,
        message: "Server error during registration",
      })
    }
  },
)

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        })
      }

      const { email, password } = req.body

      // Find user by email
      const user = await User.findOne({ email }).select("+password")
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }

      // Update last login
      user.lastLogin = new Date()
      await user.save()

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "7d",
      })

      res.json({
        success: true,
        message: "Login successful",
        data: {
          token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
            preferences: user.preferences,
            lastLogin: user.lastLogin,
          },
        },
      })
    } catch (error) {
      console.error("Login error:", error)
      res.status(500).json({
        success: false,
        message: "Server error during login",
      })
    }
  },
)

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, async (req, res) => {
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
    console.error("Get user error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   POST /api/auth/verify-email
// @desc    Verify user email
// @access  Public
router.post(
  "/verify-email",
  [body("token").exists().withMessage("Verification token is required")],
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

      const { token } = req.body

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.userId)

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid verification token",
        })
      }

      if (user.isEmailVerified) {
        return res.status(400).json({
          success: false,
          message: "Email is already verified",
        })
      }

      // Update user
      user.isEmailVerified = true
      user.emailVerifiedAt = new Date()
      await user.save()

      res.json({
        success: true,
        message: "Email verified successfully",
      })
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired verification token",
        })
      }

      console.error("Email verification error:", error)
      res.status(500).json({
        success: false,
        message: "Server error during email verification",
      })
    }
  },
)

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post(
  "/forgot-password",
  [body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email")],
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

      const { email } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        // Don't reveal if user exists or not
        return res.json({
          success: true,
          message: "If an account with that email exists, a password reset link has been sent.",
        })
      }

      // Generate reset token
      const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

      // Save reset token to user
      user.passwordResetToken = resetToken
      user.passwordResetExpires = new Date(Date.now() + 3600000) // 1 hour
      await user.save()

      // Send reset email
      try {
        await sendEmail({
          to: email,
          subject: "Reset Your EVMatch Password",
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">Password Reset Request</h2>
            <p>Hi ${user.firstName},</p>
            <p>You requested to reset your password for your EVMatch account. Click the button below to reset it:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}" 
                 style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #6b7280;">${process.env.FRONTEND_URL}/reset-password?token=${resetToken}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this password reset, please ignore this email.</p>
            <p>Best regards,<br>The EVMatch Team</p>
          </div>
        `,
        })
      } catch (emailError) {
        console.error("Failed to send reset email:", emailError)
        return res.status(500).json({
          success: false,
          message: "Failed to send password reset email",
        })
      }

      res.json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent.",
      })
    } catch (error) {
      console.error("Forgot password error:", error)
      res.status(500).json({
        success: false,
        message: "Server error",
      })
    }
  },
)

// @route   POST /api/auth/reset-password
// @desc    Reset user password
// @access  Public
router.post(
  "/reset-password",
  [
    body("token").exists().withMessage("Reset token is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage("Password must contain uppercase, lowercase, number, and special character"),
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

      const { token, password } = req.body

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.userId)

      if (!user || user.passwordResetToken !== token || user.passwordResetExpires < new Date()) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired reset token",
        })
      }

      // Hash new password
      const salt = await bcrypt.genSalt(12)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Update user
      user.password = hashedPassword
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      await user.save()

      res.json({
        success: true,
        message: "Password reset successfully",
      })
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired reset token",
        })
      }

      console.error("Reset password error:", error)
      res.status(500).json({
        success: false,
        message: "Server error during password reset",
      })
    }
  },
)

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post("/logout", auth, async (req, res) => {
  try {
    // In a more advanced implementation, you might want to blacklist the token
    // For now, we'll just send a success response and let the client handle token removal

    res.json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    console.error("Logout error:", error)
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    })
  }
})

module.exports = router
