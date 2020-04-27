const db = require('../models')

/* istanbul ignore next */

exports.addSubCategory = (req, res) => {
    db.Category.findOne({ name: req.body.category })
        .then(category => {
            db.SubCategory.create({
                name: req.body.name,
                parentCategory: category
            }).then(category => res.send(category))
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
}

/* istanbul ignore next */

exports.getSubCategories = (req, res) =>{
    db.SubCategory.find({})
        .then(subCategories => res.send({"SUCCESS": subCategories}))
        .catch(error => {
            console.log(error)
            res.send({"ERROR": true})
        })
}

/* istanbul ignore next */

exports.getSubCategoryByName = (req, res) => {
    db.Category.findOne({name: req.params.category})
    .then(category => {
        db.SubCategory.find({parentCategory: category._id})
        .then(subcategory => res.send({"SUCCESS":subcategory}))
        .catch(error => res.send({"ERROR":error}))
    })
    .catch(error => res.send({"ERROR":error}))
}

/* istanbul ignore next */

exports.deleteSubCategory = (req, res) => {
    db.SubCategory.findOneAndRemove({ _id: req.body.id })
        .then(() => res.send({ "SUCCESS": "Sub category deleted" }))
        .catch(error => {
            res.send({ "ERROR": "Failed to delete sub category" })
            console.log("SUBCAT:", error)
        })
}