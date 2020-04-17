const db = require('../models')

exports.addCategory = (req, res) =>{
    db.Category.create({
        name: req.body.name
    }).then(category=> res.send(category))
    .catch(error => console.log(error))
}

exports.getCategories = (req, res) =>{
    db.Category.find({})
        .then(categories => res.send({"SUCCESS": categories}))
        .catch(error => {
            console.log(error)
            res.send({"ERROR": true})
        })
}

exports.deleteCategory = (req, res) => {
    db.Category.findOneAndRemove({_id: req.body.id})
    .then(() => res.send({"SUCCESS": "Category Deleted"}))
    .catch(error => {
        res.send({"ERROR": "Failed while deleting category"})
        console.log("DELETE SUBCAT:", error)
    })
}