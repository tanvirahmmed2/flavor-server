const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    password:{
        type: String,
        required: true
    },
    cartItem:{
        type: Object,
        default:[]
    },
    savedItem:{
        type: Object,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    isBanned:{
        type: Boolean,
        default: false,
    },
    order:{
        type: Object,
        default: [],
    }
})

const User= mongoose.model('user', userSchema)

module.exports= User