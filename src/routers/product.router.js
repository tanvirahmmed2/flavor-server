const express = require('express')





const productRouter= express.Router()


productRouter.get('/', (req,res)=>{
    res.status(200).send(`Product router is working`)
})





module.exports= productRouter