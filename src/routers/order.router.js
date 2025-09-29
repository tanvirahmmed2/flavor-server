const express= require('express')
const { getOrder } = require('../controllers/order.controller')
const { LoggedIn, isAdmin } = require('../middlewares/user.middleware')


const orderRouter=express.Router()


orderRouter.get('/getorders', LoggedIn, isAdmin, getOrder)


module.exports= orderRouter