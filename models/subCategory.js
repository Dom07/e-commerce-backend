const mongoose = require('mongoose')

const SubCategorySchema = new mongoose.Schema({
    name: String,
    parentCategory: {type: mongoose.Schema.Types.ObjectId, ref:"Category"}
})

module.exports = mongoose.model("SubCategory", SubCategorySchema)