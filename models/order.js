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
    price: Number
})

module.exports = mongoose.model("Order", OrderSchema)