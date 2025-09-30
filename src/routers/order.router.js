const express= require('express')
const { getOrder } = require('../controllers/order.controller')
const {  isAdmin } = require('../middlewares/user.middleware')


const orderRouter=express.Router()


orderRouter.get('/getorders',  isAdmin, getOrder)



module.exports= orderRouter