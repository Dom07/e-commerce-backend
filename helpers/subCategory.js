const db = require('../models')

exports.addSubCategory = (req, res) =>{
    db.SubCategory.create({
        name: req.body.name
    }).then(category=> res.send(category))
    .catch(error => console.log(error))
}