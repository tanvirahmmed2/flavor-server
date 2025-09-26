const express = require('express')
const { registerUser, loginUser, logoutUser } = require('../controllers/user.controller')



0
const userRouter= express.Router()


userRouter.post('/signup', registerUser)
userRouter.post('/signin', loginUser)
userRouter.post('/signout', logoutUser)


module.exports= userRouter