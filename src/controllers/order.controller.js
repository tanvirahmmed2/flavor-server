const Order= require('../models/order.model')




const getOrder = async (req, res) => {
    try {
        const order = await Order.find({});
        if (!order || order.length === 0) {
            return res.status(404).send({ success: false, message: "No order found" });

        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

const orderItem=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).send(error)
    }
}



module.exports={
    getOrder,
    orderItem
}