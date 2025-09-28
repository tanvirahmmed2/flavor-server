const mongoose = require('mongoose')

const reserveSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    }
    ,
    phone:{
        type:String,
        required: true
    },
    guest:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    occasion:{
        type:String,
    }
})

const Reserve= mongoose.model('reserve', reserveSchema)

module.exports= Reserve