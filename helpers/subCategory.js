const db = require('../models')

exports.addSubCategory = (req, res) =>{
    db.SubCategory.create({
        name: req.body.name
    }).then(category=> res.send(category))
    .catch(error => console.log(error))
}

exports.deleteSubCategory = (req, res) => {
    db.SubCategory.findOneAndRemove({_id: req.body.id})
    .then(() => res.send({"SUCCESS": "Sub category deleted"}))
    .catch(error => {
        res.send({"ERROR": "Failed to delete sub category"})
        console.log("SUBCAT:", error)
    })
}