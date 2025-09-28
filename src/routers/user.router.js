const express = require('express')
const { registerUser, loginUser, logoutUser, protectedRoute } = require('../controllers/user.controller')
const { LoggedIn, isAdmin } = require('../middlewares/user.middleware')



0
const userRouter= express.Router()


userRouter.post('/signup', registerUser)
userRouter.post('/signin', loginUser)
userRouter.post('/signout',LoggedIn, logoutUser)
userRouter.get('/protected', LoggedIn, isAdmin,  protectedRoute)

userRouter.get('/protecteduser', LoggedIn,  protectedRoute)


module.exports= userRouter