var db = require('../models')
const productHelper = require('../helpers/product')
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
                productHelper.getProductCountAndReduce(item.quantity, item.productId._id, (result) => {
                    if (result) {
                        order.product.push(item)
                        order.save()
                            .then(order => {
                                helpers.clearCart(req.body.shoppingCartId)
                                db.Customer.findOne({ _id: req.body.customer_id }, "order")
                                    .then(customer => {
                                        customer.order.push(order)
                                        customer.save()
                                            .then(customer => res.send({ "SUCCESS": customer }))
                                            .catch(error => console.log(error))
                                    })
                                    .catch(error => console.log(error))
                            })
                            .catch(error => console.log(error))
                    }else{
                        res.send({"FAILED": "Item not available"})
                    }
                })
            })
        })
        .catch(error => res.send(error))
}

exports.getOrders = (req, res) => {
    db.Customer.findOne({ _id: req.params.customerId }, "order")
        .populate({
            path: "order",
            select: "orderDate status totalPrice product",
            populate: {
                path: "product.productId",
                select: "name image price"
            }
        })
        .then(order => {
            res.send({ "SUCCESS": order })
        })
}