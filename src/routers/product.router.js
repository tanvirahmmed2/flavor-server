const express = require('express')
const multer= require('multer')
const { addProduct } = require('../controllers/product.controller')


const storage = multer.memoryStorage();
const upload = multer({ storage });



const productRouter= express.Router()


productRouter.get('/', (req,res)=>{
    res.status(200).send(`Product router is working`)
})



productRouter.post('/addproduct', upload.single('image'), addProduct)



module.exports= productRouter