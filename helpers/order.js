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
            const message = []
            req.body.products.forEach(item => {
                productHelper.getProductCountAndReduce(
                    item.quantity,
                    item.productId._id,
                    result => {
                        if (result) {
                            db.Order.findByIdAndUpdate(order._id,
                                { $push: { product: item } },
                                { safe: true, upsert: true },
                                )
                                .then(() => null)
                                .catch(error => console.log("Error adding product to order document: ", error))
                        } else {
                            message.push(item.productId._id+" is out of stock") 
                        }
                    })
            })
            helpers.clearCart(req.body.shoppingCartId)
            db.Customer.findByIdAndUpdate(req.body.customer_id,
                { $push: { order: order } },
                { safe: true, upsert: true })
                .then(customer => {
                    if(message.length>0){
                        res.send({
                            "FAILED": "One or more items out of stock",
                            "MESSAGE": message
                        })
                    }else{
                        res.send({ 
                            "SUCCESS": customer,
                            "MESSAGE": "No Error" 
                        })
                    }
                   
                })
                .catch(error => console.log("ERROR while pushing to customer document: ", error))
        })
        .catch(error => {
            console.log(error)
            res.send({ "ERROR": error })
        })
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
        .catch(error => {
            console.log(error)
        })
}