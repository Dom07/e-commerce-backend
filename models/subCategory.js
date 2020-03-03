const mongoose = require('mongoose')

const SubCategorySchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model("SubCategory", SubCategorySchema)