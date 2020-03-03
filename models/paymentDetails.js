const mongoose = require('mongoose');

const PaymentDetailsSchema = new mongoose.Schema({
    cardNumber: Number,
    cvv: Number,
    expiryDate: Date
})

module.exports = mongoose.model("PaymentDetails", PaymentDetailsSchema)