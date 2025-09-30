const mongoose = require('mongoose')

const orderSchema= new mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
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
    },
    details:{
        type: Array,
        required: true
    }
})

const Order= mongoose.model('order', orderSchema)

module.exports= Order
