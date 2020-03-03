const db = require('../models')

exports.addProduct = (req, res) => {
    db.Category.findOne({ name: req.body.category })
        .then(foundCat => {
            db.SubCategory.findOne({ name: req.body.subCategory })
                .then(foundSubCat => {
                    db.Product.create({
                        name: req.body.name,
                        description: req.body.description,
                        price: req.body.price,
                        quantity: req.body.quantity,
                        category: foundCat,
                        subCategory: foundSubCat
                    })
                    .then(product => res.send(product))
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
}