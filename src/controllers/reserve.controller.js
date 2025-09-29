const Reserve= require('../models/reserve.model')

const getReserve=async(req,res)=>{
    try {
        const reserve= await Reserve.find({})
        if(!reserve){
           res.status(500).send('no reservation found') 
        }
        res.status(201).send(reserve)
    } catch (error) {
        res.status(500).send(error)
        
    }
}



module.exports={
    getReserve
}