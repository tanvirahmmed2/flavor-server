const express = require('express')
const { registerUser, loginUser, logoutUser } = require('../controllers/user.controller')
const { LoggedIn } = require('../middlewares/user.middleware')



0
const userRouter= express.Router()


userRouter.post('/signup', registerUser)
userRouter.post('/signin', loginUser)
userRouter.post('/signout',LoggedIn, logoutUser)


module.exports= userRouter