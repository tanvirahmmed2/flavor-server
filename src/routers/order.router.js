const express= require('express')
const { getOrder, orderItem } = require('../controllers/order.controller')
const {  isAdmin, LoggedIn } = require('../middlewares/user.middleware')


const orderRouter=express.Router()


orderRouter.get('/getorders',  isAdmin, getOrder)
orderRouter.post('/ordernow', LoggedIn, orderItem)



module.exports= orderRouter