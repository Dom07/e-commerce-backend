const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderDate: Date,
    status: String,
    product: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref:"Product"},
            quantity: Number
        }
    ],
    shippingAddress: String,
    totalPrice: Number,
    paymentDetails: {
        cardHolderName: String,
        cardNumber: Number,
        expiryDate: Date,
        CVV: Number
    }
})

module.exports = mongoose.model("Order", OrderSchema)