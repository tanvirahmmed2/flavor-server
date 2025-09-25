


const addProduct= async(req,res)=>{
    try {
        const {name, description, old_price, new_price, categroy}= req.body
        if(!name || !description || !old_price || !new_price || !categroy){
            res.status(500).send(`File all the requirements`)
        }

        
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