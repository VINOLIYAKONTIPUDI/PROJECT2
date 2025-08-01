const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found.",
      })
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User account is deactivated",
      })
    }

    req.user = {
      userId: decoded.id,
      email: user.email,
      role: user.role,
    }

    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      })
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired.",
      })
    }

    console.error("Auth middleware error:", error)
    res.status(500).json({
      success: false,
      message: "Server error in authentication",
    })
  }
}

module.exports = auth
