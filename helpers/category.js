const db = require('../models')

exports.addCategory = (req, res) =>{
    db.Category.create({
        name: req.body.name
    }).then(category=> res.send(category))
    .catch(error => console.log(error))
}

exports.deleteCategory = (req, res) => {
    db.Category.findOneAndRemove({_id: req.body.id})
    .then(() => res.send({"SUCCESS": "Category Deleted"}))
    .catch(error => {
        res.send({"ERROR": "Failed while deleting category"})
        console.log("DELETE SUBCAT:", error)
    })
}