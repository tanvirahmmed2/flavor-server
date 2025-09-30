const Order = require('../models/order.model')




const getOrder = async (req, res) => {
    try {
        const order = await Order.find({});
        if (!order || order.length === 0) {
            return res.status(404).send({ success: false, message: "No order found" });

        }
        res.status(200).send({
            success: true,
            payload: order
        });
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

const orderItem = async (req, res) => {
    try {
        const { userId, name, details, deliverymethod, paymethod, totalAmount, phone, email } = req.body
        if (!userId || !name || !details || !deliverymethod || !paymethod || !totalAmount || !phone || !email) {

            return res.status(403).send({
                success: false,
                message: 'Order details missing'
            })
        }
        const newOrder = new Order({ userId, name, details, deliverymethod, paymethod, totalAmount, phone, address: req.body.address })
        await newOrder.save()

        res.status(203).send({
            success: true,
            message: 'Successfully order placed'
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message:' failed to place an order'
        })
    }
}



module.exports = {
    getOrder,
    orderItem
}