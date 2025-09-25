const bcrypt = require('bcryptjs')
const User = require("../models/user.model")


const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        if (!name || !email || !phone || !password) {
            res.status(500).send({
                success: false,
                message: 'fill all the information'
            })
        }
        const existUser = await User.findOne({ email: email })
        if (existUser) {
            return res.status(500).send({
                success: false,
                message: 'user already exists with this email'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, phone, password: hashedPass })
        await newUser.save()
        res.status(200).send({
            success: true,
            payload: newUser
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'signup failed', error
        })

    }

}



module.exports = {
    registerUser,

}