const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: [{type: String}],
    ratings: {type: Number},
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: "Category"
    },
    quantity: {type: Number, required: true, min: 0},
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