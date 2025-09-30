require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const LoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.user_token
    if (!token) {
      return res.status(401).json({ success: false, message: "Login required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" })
    }

   
    const user = await User.findOne({ email: decoded.email })
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    req.user = user  
    next()
  } catch (error) {
    res.status(401).json({ success: false, message: "Authentication failed", error: error.message })
  }
}


const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.admin_token
    if (!token) {
      return res.status(401).json({ success: false, message: "Login required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" })
    }

   
    const user = await User.findOne({ email: decoded.email })
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    req.user = user  
    next()
  } catch (error) {
    res.status(401).json({ success: false, message: "Authentication failed", error: error.message })
  }
}



module.exports = {
  LoggedIn,
  isAdmin,
}
