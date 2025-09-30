require('dotenv').config()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, phone, password: hashedPass });
    await newUser.save();


    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Enter your email and password'
      })
    }

    const existUser = await User.findOne({ email })
    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: 'No user found with this email'
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, existUser.password)
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect password'
      })
    }

    // Only keep safe fields
    const user = await User.findOne({ email: email }).select({ password: 0 }).lean()

    // Sign token with limited payload
    const token = jwt.sign(
      user,
      JWT_SECRET
    )

    // Set cookies properly
    const cookieOptions = {
      httpOnly: true,
      secure: false,   // only true with HTTPS
      sameSite: "lax",
      path: "/"
    };

    if (user.isAdmin) {
      res.cookie("admin_token", token, cookieOptions);
    } else {
      res.cookie("user_token", token, cookieOptions);
    }


    // Also send token in response (so frontend can use localStorage if needed)
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user,
      token
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Error, login failed'
    })
  }
}




const logoutUser = async (req, res) => {
  try {
    // Clear cookies if they exist
    res.clearCookie("user_token", {
      httpOnly: true,
      secure: true,     // set true if using HTTPS
      sameSite: "strict",
      path: "/",
    })
    res.clearCookie("admin_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    })

    return res.status(200).json({
      success: true,
      message: "Successfully logged out"
    })
  } catch (error) {
    console.error("Logout error:", error)
    return res.status(400).json({
      success: false,
      message: "Logout failed"
    })
  }
}

const protectedRoute = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not logged in' });
  }
  res.json({ success: true, user: req.user });

}

module.exports = { registerUser, loginUser, logoutUser, protectedRoute };
