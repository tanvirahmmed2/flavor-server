


const addProduct= async(req,res)=>{
    try {
        const {name, description, old_price, new_price, category}= req.body
        if(!name || !description || !old_price || !new_price || !category){
            return res.status(400).send(`Fill all the requirements`)
        }
        const newProduct={name, description, old_price, new_price, category}
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





module.exports={
    addProduct,

}