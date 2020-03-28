const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: [String],
    ratings: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: "Category"
    },
    quantity: Number,
    subCategory: {
        type: mongoose.Schema.Types.ObjectId, ref: "SubCategory"
    },
    review: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Review"
        }
    ]
})

module.exports = mongoose.model("Product", ProductSchema);