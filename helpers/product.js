const db = require('../models')

exports.addProduct = (req, res) => {
    db.Product.findOne({ name: req.body.name })
        .then(product => {
            if (product) {
                res.send({ "FAILED": "Product already exists" })
            } else {
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
                                    image: req.body.image,
                                    ratings: 0
                                })
                                    .then(product => {
                                        res.send({ "SUCCESS": product })
                                    })
                                    .catch(error => {
                                        res.send({ "ERROR": error })
                                    })
                            })
                            .catch(error => {
                                console.log(error)
                                res.send({ "ERROR": error })
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        res.send({ "ERROR": error })
                    })
            }
        })
}

exports.deleteProduct = (req, res) => {
    db.Product.findOneAndRemove({ _id: req.body.id })
        .then(() => res.send({ "SUCCESS": "Product Removed" }))
        .catch(error => {
            res.send({ "ERROR": "Failed to remove product" })
            console.log(error)
        })
}

exports.getProductById = (req, res) => {
    db.Product.findOne({ _id: req.params.id })
        .populate({
            path: "review",
            populate: {
                path: "customerId",
                model: "Customer",
                select: "name"
            }
        })
        .then(product => {
            if (product) {
                res.send({ "SUCCESS": product })
            } else {
                res.send({ "ERROR": "product not found" })
            }
        })
        .catch(error => {
            res.send({ "ERROR": "FAILED TO GET PRODUCT" })
        })
}

exports.getFeaturedProduct = (req, res) => {
    db.Category.findOne({ name: req.params.category })
        .then(category => {
            db.Product.find({ category: category._id }).sort({ ratings: -1 }).limit(5)
                .then(products => res.send({ "SUCCESS": products }))
                .catch(error => console.log({ "ERROR": error }))
        })
        .catch(error => console.log({ "ERROR": error }))
}

exports.getProductBySubCategory = (req, res) => {
    db.Product.find({ subCategory: req.params.id })
        .then(products => res.send({ "SUCCESS": products }))
        .catch(error => res.send({ "ERROR": error }))
}

exports.getProductCountAndReduce = (count, id, callback) => {
    db.Product.findOne({ _id: id })
        .then(product => {
            if (product.quantity >= count) {
                const totalQuantity = product.quantity - count
                db.Product.findOneAndUpdate({ _id: id }, { quantity: totalQuantity })
                    .then(() => callback(true))
                    .catch(error => {
                        console.log(error)
                        callback(false)
                    })
            } else {
                callback(false)
            }
        })
        .catch(error => console.log(error))
}