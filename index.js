const express = require('express');
const bodyParser = require('body-parser');

const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/', (req, res)=>{
    res.send("hello")
})

const customerRouter = require('./routes/customer')
const categoryRouter = require('./routes/category')
const subCategoryRouter = require('./routes/subCategory')
const productRouter = require('./routes/product')
const wishListRouter = require('./routes/wishList')
const shoppingCart = require('./routes/shoppingCart')

app.use('/api/customer/', customerRouter)
app.use('/api/category/', categoryRouter)
app.use('/api/subCategory/', subCategoryRouter)
app.use('/api/product/', productRouter)
app.use('/api/wishlist/', wishListRouter)
app.use('/api/shoppingCart', shoppingCart)

app.listen(PORT, ()=>{
    console.log("Server running on port", PORT)
});

module.exports = app