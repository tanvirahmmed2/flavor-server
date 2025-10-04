const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const productRouter = require('./routers/product.router')
const userRouter = require('./routers/user.router')
const orderRouter = require('./routers/order.router')
const reserveRouter = require('./routers/reserve.router')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: [
        'https://flavorbd.netlify.app',
        'https://flavorbd-admin.netlify.app'
    ],
    credentials: true,
}));

app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).send('Server is running')
})


app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/reserve', reserveRouter)

module.exports = app