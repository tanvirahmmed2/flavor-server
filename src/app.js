const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const productRouter = require('./routers/product.router')
const userRouter = require('./routers/user.router')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // your React frontend URL
    credentials: true,               // allow cookies
}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).send('Server is running')
})


app.use('/product', productRouter)
app.use('/user', userRouter)

module.exports = app