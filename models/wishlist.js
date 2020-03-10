const mongoose = require('mongoose');

const WishListSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    justHolder: Number
})

module.exports = mongoose.model("WishList", WishListSchema)