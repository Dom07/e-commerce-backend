const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: "Customer"},
    description: String,
    rating: Number,
    date: Date
})

module.exports = mongoose.model("Review", ReviewSchema)