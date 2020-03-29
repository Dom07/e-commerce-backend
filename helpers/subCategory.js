const db = require('../models')

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

exports.getSubCategories = (req, res) => {
    db.Category.findOne({name: req.params.category})
    .then(category => {
        db.SubCategory.find({parentCategory: category._id})
        .then(subcategory => res.send({"SUCCESS":subcategory}))
        .catch(error => res.send({"ERROR":error}))
    })
    .catch(error => res.send({"ERROR":error}))
}

exports.deleteSubCategory = (req, res) => {
    db.SubCategory.findOneAndRemove({ _id: req.body.id })
        .then(() => res.send({ "SUCCESS": "Sub category deleted" }))
        .catch(error => {
            res.send({ "ERROR": "Failed to delete sub category" })
            console.log("SUBCAT:", error)
        })
}