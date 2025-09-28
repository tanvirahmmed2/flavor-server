const express= require('express')
const { getReserve } = require('../controllers/reserve.controller')


const reserveRouter=express.Router()

reserveRouter.get('/', getReserve)



module.exports= reserveRouter