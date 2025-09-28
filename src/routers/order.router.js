const express= require('express')
const { getOrder } = require('../controllers/order.controller')


const orderRouter=express.Router()


orderRouter.get('/', getOrder)


module.exports= orderRouter