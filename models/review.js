const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    description: String,
    rating: Number,
    date: Date
})

module.exports = mongoose.model("Review", ReviewSchema)