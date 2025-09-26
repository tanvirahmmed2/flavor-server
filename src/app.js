const express= require('express')
const cors= require('cors')
const cookieParser = require("cookie-parser")
const productRouter = require('./routers/product.router')
const userRouter = require('./routers/user.router')

const app= express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.status(200).send('Server is running')
})


app.use('/product', productRouter)
app.use('/user',userRouter)

module.exports = app