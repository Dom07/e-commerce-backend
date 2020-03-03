var db = require('../models')

exports.getCustomer = (req, res) => {
    db.User.findOne({ email: req.body.emailId, password: req.body.password })
        .then(user => {
            db.Customer.findOne({ userId: user._id })
                .then(customer => {
                    res.send(customer)
                }).catch(error => console.log(error))
        }).catch(error => console.log(error))
}

exports.addCustomer = (req, res) => {
    db.User.create({
        email: req.body.emailId,
        password: req.body.password
    }, (error, user) => {
        if (error) {
            console.log(error)
            res.send(error)
        }
        db.Customer.create({
            name: req.body.name,
            address: req.body.address,
            phoneNo: req.body.phoneNumber,
            userId: user,
        }, (error, customer) => {
            if (error) {
                console.log(error)
                res.send(error)
            }
            else {
                res.send("New customer added")
            }
        })
    })
}