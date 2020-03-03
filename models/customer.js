const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name: String,
    address: String,
    phoneNo: Number,
    paymentDetails: [
        {type: mongoose.Schema.Types.ObjectId, ref: "PaymentDetails"}
    ],
    shoppingCart: {type: mongoose.Schema.Types.ObjectId, ref: "ShoppingCart"},
    wishList: {type: mongoose.Schema.Types.ObjectId, ref: "WishList"},
    order: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Order"}
    ]
})

module.exports = mongoose.model("Customer", CustomerSchema)