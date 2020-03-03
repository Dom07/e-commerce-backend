const mongoose = require('mongoose');

const WishListSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"}
})

module.exports = mongoose.model("WishList", WishListSchema)