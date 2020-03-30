const db = require('../models')
const mongoose = require('mongoose')

exports.viewCart = (req, res) => {
    db.Customer.findOne({ _id: req.body.customer_id }, 'shoppingCart').populate('shoppingCart')
        .then(shoppingCart => {
            res.send(shoppingCart)
        })
        .catch(error => res.send("ERROR"))
}

exports.updateCart = (req, res) => {
    db.Customer.findOne({ _id: req.body.customer_id }, 'shoppingCart').populate('shoppingCart')
        .then(customer => {
            db.ShoppingCart.findOne({ _id: customer.shoppingCart })
                .then(cart => {
                    index = cart.products.findIndex(item => (item.productId == req.body.product_id))
                    cart.products[index]["quantity"] = req.body.quantity
                    cart.products[index]["dateAdded"] = new Date()
                    cart.save()
                    .then(cart => res.send({"SUCCESS": cart}))
                    .catch(error => {
                        res.send({ "ERROR": "Failed to update cart" })
                        console.log(error)
                    })
                })
                .catch(error => {
                    res.send({ "ERROR": "Failed to update cart" })
                    console.log(error)
                })
        })
}

exports.addToCart = (req, res) => {
    db.Customer.findOne({ _id: req.body.customer_id }, 'shoppingCart')
        .then(customer => {
            db.ShoppingCart.findOne({ _id: customer.shoppingCart })
                .then(shoppingCart => {
                    product = {
                        productId: req.body.product_id,
                        quantity: 1,
                        dateAdded: new Date()
                    }
                    shoppingCart.products.push(product)
                    shoppingCart.save().then(cart => {
                        res.send({ "SUCCESS": cart })
                    })
                        .catch(error => res.send({ "ERROR": error }))
                })
        })
}