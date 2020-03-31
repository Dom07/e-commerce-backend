var db = require('../models')
const helpers = require('../helpers/shoppingCart')

exports.placeOrder = (req, res) => {
    db.Order.create({
        orderDate: Date.now(),
        status: "Processing",
        product: [],
        shippingAddress: req.body.shippingAddress,
        totalPrice: req.body.totalPrice,
        paymentDetails: {
            cardHolderName: req.body.cardHolderName,
            cardNumber: req.body.cardNumber,
            expiryDate: req.body.expiryDate,
            CVV: req.body.CVV
        }
    })
        .then(order => {
            req.body.products.forEach(item => {
                order.product.push(item)
            })
            order.save()
                .then(order => {
                    helpers.clearCart(req.body.shoppingCartId)
                    res.send({ "SUCCESS": true })
                })
                .catch(error => res.send(error))
        })
        .catch(error => res.send(error))
}

exports.getOrders = (req, res) => {
    db.Customer.findOne({_id: req.body.customerId}, "order")
    .then(order => {
        // Complete this
    })
}