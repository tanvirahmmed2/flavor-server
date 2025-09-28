const mongoose = require('mongoose')

const orderSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    }
    ,
    totalAmount:{
        type:String,
        required: true
    }
    ,
    deliverymethod:{
        type:String,
        required: true
    }
    ,
    address:{
        type:String,
        
    }
    ,
    paymethod:{
        type:String,
        required: true
    }
})

const Order= mongoose.model('order', orderSchema)

module.exports= Order
