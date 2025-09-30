const express = require('express')
const multer= require('multer')
const { addProduct, removeProduct } = require('../controllers/product.controller');
const { isAdmin } = require('../middlewares/user.middleware');
const Product = require('../models/product.model');


const storage = multer.memoryStorage();
const upload = multer({ storage });



const productRouter= express.Router()


productRouter.get('/',  async(req,res)=>{
    try {
        const products= await Product.find({})
        if(!products){
            return res.status(500).send(`No product found`)
        }
        res.status(200).send({
            success: true,
            product: products
        })
    } catch (error) {
        res.status(500).send(error + `Product fetching failed`)
    }
})

productRouter.post('/addproduct', isAdmin, upload.single('image'), addProduct)
productRouter.post('/removeproduct', isAdmin, removeProduct)



module.exports= productRouter