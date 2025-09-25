const express= require('express')
const cors= require('cors')
const productRouter = require('./routers/product.router')

const app= express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/', (req,res)=>{
    res.status(200).send('Server is running')
})


app.use('/product', productRouter)

module.exports = app