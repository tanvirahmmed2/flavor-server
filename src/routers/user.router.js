const express = require('express')
const { registerUser, loginUser } = require('../controllers/user.controller')



0
const userRouter= express.Router()


userRouter.post('/signup', registerUser)
userRouter.post('/signin', loginUser)


module.exports= userRouter