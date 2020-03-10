const express = require('express');
const bodyParser = require('body-parser');

const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send("hello")
})

const customerRouter = require('./routes/customer')
const categoryRouter = require('./routes/category')
const subCategoryRouter = require('./routes/subCategory')
const productRouter = require('./routes/product')
const wishListRouter = require('./routes/wishList')

app.use('/api/customer/', customerRouter)
app.use('/api/category/', categoryRouter)
app.use('/api/subCategory/', subCategoryRouter)
app.use('/api/product/', productRouter)
app.use('/api/wishlist/', wishListRouter)

app.listen(PORT, ()=>{
    console.log("Server running on port", PORT)
});

module.exports = app