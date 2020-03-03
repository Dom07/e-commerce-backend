const mongoose = require('mongoose');

const ShoppingCartSchema = new mongoose.Schema({
    products: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Product" 
            },
            quantity: Number,
            dateAdded: Date
        }
    ],
    price: Number
})

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema)