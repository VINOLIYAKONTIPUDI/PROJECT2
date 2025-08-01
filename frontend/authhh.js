const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { auth } = require("../middleware/auth");
const authConfig = require("../config/auth.config");
const { validateEmail, validatePassword } = require("../utils/validate");

// Configuration object - can be loaded from environment or config service
const authConfig = {
  validation: {
    name: {
      minLength: parseInt(process.env.NAME_MIN_LENGTH) || 2,
      maxLength: parseInt(process.env.NAME_MAX_LENGTH) || 50
    },
    password: {
      minLength: parseInt(process.env.PASSWORD_MIN_LENGTH) || 8,
      pattern: process.env.PASSWORD_PATTERN || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12
    },
    email: {
      pattern: process.env.EMAIL_PATTERN || /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
  },
  tokens: {
    jwtExpiry: process.env.JWT_EXPIRE || "7d",
    verificationExpiry: process.env.EMAIL_VERIFICATION_EXPIRY || "24h",
    resetExpiry: process.env.PASSWORD_RESET_EXPIRY || "1h",
    resetExpiryMs: parseInt(process.env.PASSWORD_RESET_EXPIRY_MS) || 3600000
  },
  messages: {
    validation: process.env.VALIDATION_FAILED_MESSAGE || "Validation failed",
    userExists: process.env.USER_EXISTS_MESSAGE || "User already exists with this email",
    invalidCredentials: process.env.INVALID_CREDENTIALS_MESSAGE || "Invalid email or password",
    userNotFound: process.env.USER_NOT_FOUND_MESSAGE || "User not found",
    emailAlreadyVerified: process.env.EMAIL_VERIFIED_MESSAGE || "Email is already verified",
    emailVerified: process.env.EMAIL_VERIFICATION_SUCCESS || "Email verified successfully",
    passwordResetSent: process.env.PASSWORD_RESET_SENT_MESSAGE || "If an account with that email exists, a password reset link has been sent.",
    passwordResetSuccess: process.env.PASSWORD_RESET_SUCCESS || "Password reset successfully",
    logoutSuccess: process.env.LOGOUT_SUCCESS_MESSAGE || "Logged out successfully"
  },
  features: {
    enableEmailVerification: process.env.ENABLE_EMAIL_VERIFICATION !== 'false',
    enablePasswordReset: process.env.ENABLE_PASSWORD_RESET !== 'false',
    enableLoginLogging: process.env.ENABLE_LOGIN_LOGGING === 'true',
    enableRegistrationLogging: process.env.ENABLE_REGISTRATION_LOGGING === 'true',
    enableExternalValidation: process.env.ENABLE_EXTERNAL_AUTH_VALIDATION === 'true',
    strictValidation: process.env.STRICT_VALIDATION === 'true'
  },
  branding: {
    appName: process.env.APP_NAME || "EVMatch",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
    supportEmail: process.env.SUPPORT_EMAIL || "support@evmatch.com",
    brandColor: process.env.BRAND_COLOR || "#10b981"
  }
}

// Dynamic validation rules builder
const createValidationRules = (type) => {
  const rules = []
  
  switch (type) {
    case 'register':
      rules.push(
        body("firstName")
          .trim()
          .isLength({ min: authConfig.validation.name.minLength, max: authConfig.validation.name.maxLength })
          .withMessage(`First name must be between ${authConfig.validation.name.minLength} and ${authConfig.validation.name.maxLength} characters`),
        body("lastName")
          .trim()
          .isLength({ min: authConfig.validation.name.minLength, max: authConfig.validation.name.maxLength })
          .withMessage(`Last name must be between ${authConfig.validation.name.minLength} and ${authConfig.validation.name.maxLength} characters`),
        body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
        body("password")
          .isLength({ min: authConfig.validation.password.minLength })
          .withMessage(`Password must be at least ${authConfig.validation.password.minLength} characters`)
          .matches(authConfig.validation.password.pattern)
          .withMessage("Password must contain uppercase, lowercase, number, and special character")
      )
      break
    case 'login':
      rules.push(
        body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
        body("password").exists().withMessage("Password is required")
      )
      break
    case 'resetPassword':
      rules.push(
        body("token").exists().withMessage("Reset token is required"),
        body("password")
          .isLength({ min: authConfig.validation.password.minLength })
          .withMessage(`Password must be at least ${authConfig.validation.password.minLength} characters`)
          .matches(authConfig.validation.password.pattern)
          .withMessage("Password must contain uppercase, lowercase, number, and special character")
      )
      break
    default:
      break
  }
  
  return rules
}

// Email template builder
const buildEmailTemplate = (type, data) => {
  const templates = {
    verification: {
      subject: `Verify Your ${authConfig.branding.appName} Account`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: ${authConfig.branding.brandColor};">Welcome to ${authConfig.branding.appName}!</h2>
          <p>Hi ${data.firstName},</p>
          <p>Thank you for joining ${authConfig.branding.appName}. Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${authConfig.branding.frontendUrl}/verify-email?token=${data.token}" 
               style="background: ${authConfig.branding.brandColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #6b7280;">${authConfig.branding.frontendUrl}/verify-email?token=${data.token}</p>
          <p>This link will expire in ${authConfig.tokens.verificationExpiry}.</p>
          <p>Best regards,<br>The ${authConfig.branding.appName} Team</p>
        </div>
      `
    },
    passwordReset: {
      subject: `Reset Your ${authConfig.branding.appName} Password`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: ${authConfig.branding.brandColor};">Password Reset Request</h2>
          <p>Hi ${data.firstName},</p>
          <p>You requested to reset your password for your ${authConfig.branding.appName} account. Click the button below to reset it:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${authConfig.branding.frontendUrl}/reset-password?token=${data.token}" 
               style="background: ${authConfig.branding.brandColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #6b7280;">${authConfig.branding.frontendUrl}/reset-password?token=${data.token}</p>
          <p>This link will expire in ${authConfig.tokens.resetExpiry}.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>Best regards,<br>The ${authConfig.branding.appName} Team</p>
        </div>
      `
    }
  }
  
  return templates[type] || {}
}

// API integration helper
const callExternalAPI = async (endpoint, data, method = 'POST') => {
  if (!endpoint) return null
  
  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_SECRET_KEY}`
      },
      body: JSON.stringify(data)
    })
    
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error(`External API call failed for ${endpoint}:`, error)
  }
  return null
}

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", createValidationRules('register'), async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: authConfig.messages.validation,
        errors: errors.array(),
      })
    }

    const { firstName, lastName, email, password } = req.body

    // External validation check
    if (authConfig.features.enableExternalValidation) {
      const validationResult = await callExternalAPI(process.env.USER_VALIDATION_API_URL, {
        email, firstName, lastName
      })
      
      if (validationResult?.blocked) {
        return res.status(403).json({
          success: false,
          message: validationResult.reason || "Registration blocked by validation service"
        })
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: authConfig.messages.userExists,
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(authConfig.validation.password.saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isEmailVerified: !authConfig.features.enableEmailVerification,
    })

    await user.save()

    // Generate email verification token
    let verificationToken = null
    if (authConfig.features.enableEmailVerification) {
      verificationToken = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: authConfig.tokens.verificationExpiry }
      )

      // Send verification email
      try {
        const emailTemplate = buildEmailTemplate('verification', { firstName, token: verificationToken })
        await sendEmail({
          to: email,
          ...emailTemplate
        })
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError)
        if (authConfig.features.strictValidation) {
          await User.findByIdAndDelete(user._id)
          return res.status(500).json({
            success: false,
            message: "Failed to send verification email"
          })
        }
      }
    }

    // Log registration
    if (authConfig.features.enableRegistrationLogging) {
      await callExternalAPI(process.env.REGISTRATION_LOG_API_URL, {
        userId: user._id,
        email,
        timestamp: new Date().toISOString(),
        ip: req.ip,
        userAgent: req.get('User-Agent')
      })
    }

    const responseMessage = authConfig.features.enableEmailVerification
      ? "User registered successfully. Please check your email to verify your account."
      : "User registered successfully."

    res.status(201).json({
      success: true,
      message: responseMessage,
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
})

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", createValidationRules('login'), async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: authConfig.messages.validation,
        errors: errors.array(),
      })
    }

    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      // Log failed login attempt
      if (authConfig.features.enableLoginLogging) {
        await callExternalAPI(process.env.LOGIN_LOG_API_URL, {
          email,
          success: false,
          reason: 'user_not_found',
          timestamp: new Date().toISOString(),
          ip: req.ip,
          userAgent: req.get('User-Agent')
        })
      }
      
      return res.status(401).json({
        success: false,
        message: authConfig.messages.invalidCredentials,
      })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      // Log failed login attempt
      if (authConfig.features.enableLoginLogging) {
        await callExternalAPI(process.env.LOGIN_LOG_API_URL, {
          userId: user._id,
          email,
          success: false,
          reason: 'invalid_password',
          timestamp: new Date().toISOString(),
          ip: req.ip,
          userAgent: req.get('User-Agent')
        })
      }
      
      return res.status(401).json({
        success: false,
        message: authConfig.messages.invalidCredentials,
      })
    }

    // Update last login
    user.lastLogin = new Date()
    user.loginCount = (user.loginCount || 0) + 1
    await user.save()

    // Generate JWT token with dynamic payload
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role
    }

    // Add additional claims from environment
    const additionalClaims = process.env.JWT_ADDITIONAL_CLAIMS?.split(',') || []
    additionalClaims.forEach(claim => {
      if (user[claim]) {
        tokenPayload[claim] = user[claim]
      }
    })

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: authConfig.tokens.jwtExpiry,
      issuer: process.env.JWT_ISSUER || authConfig.branding.appName,
      audience: process.env.JWT_AUDIENCE || 'users'
    })

    // Log successful login
    if (authConfig.features.enableLoginLogging) {
      await callExternalAPI(process.env.LOGIN_LOG_API_URL, {
        userId: user._id,
        email,
        success: true,
        timestamp: new Date().toISOString(),
        ip: req.ip,
        userAgent: req.get('User-Agent')
      })
    }

    // Build response user object dynamically
    const userFields = process.env.LOGIN_RESPONSE_FIELDS?.split(',') || 
      ['id', 'firstName', 'lastName', 'email', 'isEmailVerified', 'preferences', 'lastLogin']
    
    const userResponse = {}
    userFields.forEach(field => {
      switch (field) {
        case 'id':
          userResponse.id = user._id
          break
        default:
          if (user[field] !== undefined) {
            userResponse[field] = user[field]
          }
      }
    })

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: userResponse,
        expiresIn: authConfig.tokens.jwtExpiry
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Server error during login",
    })
  }
})

// @route   GET /api/auth/me
// @desc    Get current user

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: authConfig.messages.userNotFound,
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: authConfig.messages.serverError,
    });
  }
});


// @route   POST /api/auth/verify-email
// @desc    Verify user email
// @access  Public
router.post("/verify-email", [body("token").exists().withMessage("Verification token is required")], async (req, res) => {
  try {
    if (!authConfig.features.enableEmailVerification) {
      return res.status(404).json({
        success: false,
        message: "Email verification is not enabled"
      })
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: authConfig.messages.validation,
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
        message: authConfig.messages.emailAlreadyVerified,
      })
    }

    // Update user
    user.isEmailVerified = true
    user.emailVerifiedAt = new Date()
    await user.save()

    // Log email verification
    await callExternalAPI(process.env.EMAIL_VERIFICATION_LOG_API_URL, {
      userId: user._id,
      email: user.email,
      timestamp: new Date().toISOString()
    })

    res.json({
      success: true,
      message: authConfig.messages.emailVerified,
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
})

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post("/forgot-password", [body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email")], async (req, res) => {
  try {
    if (!authConfig.features.enablePasswordReset) {
      return res.status(404).json({
        success: false,
        message: "Password reset is not enabled"
      })
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: authConfig.messages.validation,
        errors: errors.array(),
      })
    }

    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      // Log password reset attempt for non-existent user
      await callExternalAPI(process.env.PASSWORD_RESET_LOG_API_URL, {
        email,
        success: false,
        reason: 'user_not_found',
        timestamp: new Date().toISOString(),
        ip: req.ip
      })

      return res.json({
        success: true,
        message: authConfig.messages.passwordResetSent,
      })
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: authConfig.tokens.resetExpiry }
    )

    // Save reset token to user
    user.passwordResetToken = resetToken
    user.passwordResetExpires = new Date(Date.now() + authConfig.tokens.resetExpiryMs)
    await user.save()

    // Send reset email
    try {
      const emailTemplate = buildEmailTemplate('passwordReset', { firstName: user.firstName, token: resetToken })
      await sendEmail({
        to: email,
        ...emailTemplate
      })

      // Log successful password reset email
      await callExternalAPI(process.env.PASSWORD_RESET_LOG_API_URL, {
        userId: user._id,
        email,
        success: true,
        timestamp: new Date().toISOString(),
        ip: req.ip
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
      message: authConfig.messages.passwordResetSent,
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @route   POST /api/auth/reset-password
// @desc    Reset user password
// @access  Public
router.post("/reset-password", createValidationRules('resetPassword'), async (req, res) => {
  try {
    if (!authConfig.features.enablePasswordReset) {
      return res.status(404).json({
        success: false,
        message: "Password reset is not enabled"
      })
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: authConfig.messages.validation,
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
    const salt = await bcrypt.genSalt(authConfig.validation.password.saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Update user
    user.password = hashedPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    // Log successful password reset
    await callExternalAPI(process.env.PASSWORD_RESET_LOG_API_URL, {
      userId: user._id,
      email: user.email,
      action: 'password_reset_completed',
      timestamp: new Date().toISOString(),
      ip: req.ip
    })

    res.json({
      success: true,
      message: authConfig.messages.passwordResetSuccess,
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
})

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", auth, async (req, res) => {
  try {
    // Log logout
    await callExternalAPI(process.env.LOGOUT_LOG_API_URL, {
      userId: req.user.userId,
      timestamp: new Date().toISOString(),
      ip: req.ip
    })

    // In advanced implementation, add token to blacklist
    if (process.env.TOKEN_BLACKLIST_API_URL) {
      await callExternalAPI(process.env.TOKEN_BLACKLIST_API_URL, {
        token: req.header('Authorization')?.replace('Bearer ', ''),
        userId: req.user.userId,
        timestamp: new Date().toISOString()
      })
    }

    res.json({
      success: true,
      message: authConfig.messages.logoutSuccess,
    })
  } catch (error) {
    console.error("Logout error:", error)
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    })
  }
})

module.exports = auth;
