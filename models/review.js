const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    description: String,
    rating: Number,
    date: Date
})

module.exports = mongoose.model("Review", ReviewSchema)