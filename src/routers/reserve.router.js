const express= require('express')
const { getReserve } = require('../controllers/reserve.controller')
const { LoggedIn, isAdmin } = require('../middlewares/user.middleware')


const reserveRouter=express.Router()

reserveRouter.get('/',LoggedIn, isAdmin, getReserve)



module.exports= reserveRouter