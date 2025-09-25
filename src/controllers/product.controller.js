const cloudinary = require('../config/cloudinary')
const Product = require('../models/product.model')


const addProduct = async (req, res) => {
    try {
        const { name, description, old_price, new_price, category } = req.body
        if (!name || !description || !old_price || !new_price || !category) {
            return res.status(400).send(`Fill all the requirements`)
        }
        
        if (!req.file) {
            return res.status(400).send(`Image missing`)
        }
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const uploadedImage = await cloudinary.uploader.upload(fileStr, {
            folder: 'flavor',
        });

        const newProduct = new  Product({ name, description, old_price, new_price, category, image: uploadedImage.secure_url, image_id: uploadedImage.public_id })



        await newProduct.save()


        res.status(200).send({
            success: true,
            payload: newProduct
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: error
        })

    }
}





module.exports = {
    addProduct,

}