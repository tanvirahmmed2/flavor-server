const cloudinary = require('../config/cloudinary')
const Product = require('../models/product.model')


const addProduct = async (req, res) => {
  try {
    const { name, description, old_price, new_price, category } = req.body;

    if (!name || !description || !old_price || !new_price || !category) {
      return res.status(400).json({ success: false, message: "Fill all the requirements" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image missing" });
    }

    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const uploadedImage = await cloudinary.uploader.upload(fileStr, { folder: 'flavor' });

    const newProduct = new Product({
      name,
      description,
      old_price: parseFloat(old_price),
      new_price: parseFloat(new_price),
      category,
      image: uploadedImage.secure_url,
      image_id: uploadedImage.public_id,
    });

    await newProduct.save();

    res.status(200).json({ success: true, payload: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Product couldn't be added" });
  }
};


const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).send({ success: false, message: "Product ID didn't match with any product" });
    }

    if (!product.image_id) {
      return res.status(404).send({ success: false, message: "Product image not found" });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(product.image_id);

    // Delete product from DB
    await Product.findOneAndDelete({ _id: id });

    res.status(200).send({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Product remove process failed" });
  }
};






module.exports = {
  addProduct,
  removeProduct

}