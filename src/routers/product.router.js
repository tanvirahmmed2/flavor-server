const express = require('express')
const multer= require('multer')
const { addProduct } = require('../controllers/product.controller');
const { isAdmin } = require('../middlewares/user.middleware');


const storage = multer.memoryStorage();
const upload = multer({ storage });



const productRouter= express.Router()


productRouter.get('/', (req,res)=>{
    res.status(200).send(`Product router is working`)
})



productRouter.post('/addproduct', isAdmin, upload.single('image'), addProduct)



module.exports= productRouter