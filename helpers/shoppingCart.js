const db = require('../models')

exports.viewCart = (req, res) => {
    db.Customer.findOne({ _id: req.params.customer_id }, 'shoppingCart')
        .populate([
            {
                path: "shoppingCart",
                model: "ShoppingCart",
                populate: {
                    path: "products.productId",
                    select: "image price name quantity"
                }
            }
        ])
        .then(shoppingCart => {
            res.send({ "SUCCESS": shoppingCart })
        })
        .catch(error => res.send("ERROR"))
}

exports.updateCart = (req, res) => {
    db.Customer.findOne({ _id: req.body.customer_id }, 'shoppingCart').populate('shoppingCart')
        .then(customer => {
            console.log(customer)
            db.ShoppingCart.findOne({ _id: customer.shoppingCart })
                .then(cart => {
                    index = cart.products.findIndex(item => (item.productId == req.body.product_id))
                    cart.products[index]["quantity"] = req.body.quantity
                    cart.products[index]["dateAdded"] = new Date()
                    cart.save()
                        .then(cart => res.send({ "SUCCESS": cart }))
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

exports.removeItemFromCart = (req, res) => {
    db.Customer.findOne({ _id: req.body.customer_id }, 'shoppingCart')
        .then(response => {
            db.ShoppingCart.findOne({ _id: response.shoppingCart })
                .then(cart => {
                    const index = cart.products.findIndex(item => {
                        console.log(item.productId)
                        return item.productId == req.body.productId
                    })
                    console.log(index)
                    if(index!=-1) cart.products.splice(index, 1)
                    cart.save()
                        .then(cart => res.send({"SUCCESS": cart.products}))
                        .catch(error => res.send(error))
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

exports.clearCart = (cartId) =>{
    db.ShoppingCart.findOne({_id: cartId})
    .then(cart => {
        cart.products = []
        cart.save()
        .then(cart => true)
        .catch(error => error)
    })
}