const db = require('../models')

exports.addProduct = (req, res) => {
    db.Category.findOne({ _id: req.body.category })
        .then(foundCat => {
            db.SubCategory.findOne({ _id: req.body.subCategory })
                .then(foundSubCat => {
                    db.Product.create({
                        name: req.body.name,
                        description: req.body.description,
                        price: req.body.price,
                        quantity: req.body.quantity,
                        category: foundCat,
                        subCategory: foundSubCat,
                    })
                    .then(newProduct => {
                        req.body.url.forEach(item => {
                            newProduct.image.push(item)
                        })
                        newProduct.save()
                        .then(product => {
                            res.send(product)
                        })
                        .catch(error =>{
                            res.send({"failed": error})
                        })
                    })
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
}

exports.deleteProduct = (req, res) =>{
    db.Product.findOneAndRemove({_id: req.body.id})
    .then(() => res.send({"SUCCESS": "Product Removed"}))
    .catch(error => {
        res.send({"ERROR": "Failed to remove product"})
        console.log(error)
    })
}

exports.allProduct = (req, res) => {
    db.Product.find({})
    .then(products => {
        res.send({"SUCCESS": products})
    })
    .catch(error => {
        res.send({"ERROR": "FAILED TO FETCH PRODUCTS"})
        console.log(error)
    })
}