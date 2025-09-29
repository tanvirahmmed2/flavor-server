const Reserve = require('../models/reserve.model')

const getReserve = async (req, res) => {
    try {
        const reserve = await Reserve.find({})
        if (!reserve) {
            res.status(500).send('no reservation found')
        }
        res.status(201).send(reserve)
    } catch (error) {
        res.status(500).send(error)

    }
}

const reserveSeat = async (req, res) => {
    try {
        const { name, phone, guest, date, occasion } = req.body;

        if (!name || !phone || !guest || !date) {
            return res.status(400).json({ success: false, message: "Fill all the inputs" });
        }

        const existReserve = await Reserve.findOne({ phone });
        if (existReserve) {
            return res.status(400).json({ success: false, message: "Already reserved" });
        }

        const reserve = new Reserve({ name, phone, guest, date, occasion });
        await reserve.save();

        return res.status(200).json({ success: true, message: "Reservation successful" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const deletReserve = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Reserve id not found'
            })
        }
        const reserve = await Reserve.findOne({ _id: id })
        if (!reserve) {
            return res.status(400).send({
                success: false,
                message: 'Reserve  not found'
            })
        }
        await Reserve.findOneAndDelete({ _id: id })
        res.status(200).send({
            success: true,
            message: 'successfully deleted reservation'
        })

    } catch (error) {
        res.status(500).send(error)

    }
}



module.exports = {
    getReserve,
    reserveSeat,
    deletReserve
}