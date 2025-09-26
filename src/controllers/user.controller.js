const bcrypt = require('bcryptjs');
const User = require("../models/user.model");

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
      return res.status(400).send({
        success: false,
        message: 'enter your email and password'
      })
    }
    const existUser = await User.findOne({ email: email })
    if (!existUser) {
      return res.status(400).send({
        success: false,
        message: 'no user info found with this email'
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, existUser.password);
    if (!isPasswordMatch) {
      return res.status(400).send({
        success: false,
        message: 'incorrect password'
      })
    }
    res.status(200).send({
      success: true,
      message: 'logged in succefully',
      payload: existUser
    })



  } catch (error) {
    res.status(500).send({
      success: false,
      message: error
    })

  }
}

module.exports = { registerUser, loginUser };
