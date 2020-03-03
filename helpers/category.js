const db = require('../models')

exports.addCategory = (req, res) =>{
    db.Category.create({
        name: req.body.name
    }).then(category=> res.send(category))
    .catch(error => console.log(error))
}