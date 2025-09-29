const express= require('express')
const { getReserve, reserveSeat, deletReserve } = require('../controllers/reserve.controller')
const { LoggedIn, isAdmin } = require('../middlewares/user.middleware')


const reserveRouter=express.Router()

reserveRouter.get('/',LoggedIn, isAdmin, getReserve)
reserveRouter.post('/book', LoggedIn, reserveSeat)
reserveRouter.post('/delete', LoggedIn, isAdmin, deletReserve)



module.exports= reserveRouter