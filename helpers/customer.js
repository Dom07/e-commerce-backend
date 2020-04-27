var db = require('../models')

/* istanbul ignore next */

exports.getCustomer = (req, res) => {
    db.User.findOne({ email: req.body.emailId, password: req.body.password })
        .then(user => {
            db.Customer.findOne({ userId: user._id })
                .then(customer => {
                    res.send({ "SUCCESS": customer })
                }).catch(error => res.send({ "ERROR": 404 }))
        }).catch(error => res.send({ "ERROR": 404 }))
}

/* istanbul ignore next */


exports.addCustomer = (req, res) => {
    db.User.create({
        email: req.body.emailId,
        password: req.body.password
    }).then(user => {
        db.ShoppingCart.create({
            price: 0
        }).then(cart => {
            db.Customer.create({
                name: req.body.name,
                address: req.body.address,
                phoneNo: req.body.phoneNumber,
                userId: user,
                shoppingCart: cart
            }).then(customer => {
                res.send({ "SUCCESS": customer })
            }).catch(error => res.send({ "ERROR": error }))
        }).catch(error => res.send({ "ERROR": error }))
    }).catch(error => res.send({ "ERROR": error }))
}