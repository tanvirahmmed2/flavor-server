require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const LoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.user_token || req.cookies.admin_token;
        if (!token) {
            return res.status(500).send("token not found, login first")
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(404).send({
                success: false,
                message: 'invalid token'
            });
        }
        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        req.user = decoded
        next()
    } catch (error) {
        res.status(500).send("authentication failed")
    }
}


const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.admin_token
        if (!token) {
            return res.status(500).send("token not found, login first")
        }
        const decoded= await jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(500).send("invalid token")
        }
        req.user = decoded
        next()

    } catch (error) {
        res.status(500).send(error + "token not found")

    }
}

module.exports = {
    LoggedIn,
    isAdmin,
}