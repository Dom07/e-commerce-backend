var db = require('../models')
const helpers = require('../helpers/shoppingCart')

// Implement logic to reduce item count in db
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
                console.log(order)
                helpers.clearCart(req.body.shoppingCartId)
                db.Customer.findOne({ _id: req.body.customer_id }, "order")
                    .then(customer => {
                        console.log(customer)
                        customer.order.push(order)
                        customer.save()
                            .then(customer => res.send({ "SUCCESS": customer }))
                            .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    })
    .catch(error => res.send(error))
}

exports.getOrders = (req, res) => {
    db.Customer.findOne({ _id: req.params.customerId }, "order")
        .populate({
            path: "order",
            select: "orderDate status totalPrice product",
            populate:{
                path: "product.productId",
                select: "name image price"
            }
        })
        .then(order => {
            res.send({"SUCCESS": order})
        })
}