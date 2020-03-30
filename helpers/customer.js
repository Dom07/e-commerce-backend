var db = require('../models')

exports.getCustomer = (req, res) => {
    db.User.findOne({ email: req.body.emailId, password: req.body.password })
        .then(user => {
            db.Customer.findOne({ userId: user._id })
                .then(customer => {
                    res.send({"SUCCESS":customer})
                }).catch(error => res.send({"ERROR": 404}))
        }).catch(error => res.send({"ERROR": 404}))
}

exports.addCustomer = (req, res) => {
    db.User.create({
        email: req.body.emailId,
        password: req.body.password
    }).then(user => {
        db.ShoppingCart.create({
            price: 0
        }).then(cart => {
            db.WishList.create({
                justHolder: 0
            }).then(wishlist => {
                db.Customer.create({
                    name: req.body.name,
                    address: req.body.address,
                    phoneNo: req.body.phoneNumber,
                    userId: user,
                    shoppingCart: cart,
                    wishList: wishlist
                }).then(customer => {
                    res.send({ "Success": customer })
                }).catch(error => res.send({ "ERROR": error }))
            }).catch(error => res.send({ "ERROR": error }))
        }).catch(error => res.send({ "ERROR": error }))
    }).catch(error => res.send({ "ERROR": error }))
}