var db = require('../models')

exports.addReview = (req, res) => {
    db.Customer.findOne({_id: req.body.customer_id})
    .then(customer => {
        db.Review.create({
            customerId: customer,
            description: req.body.description,
            rating: req.body.rating,
            date: Date.now()
        })
        .then(review => {
            db.Product.findOne({_id: req.body.product_id})
            .then(product => {
                product.review.push(review)
                product.save()
                .then(product => res.send({"SUCCESS": true}))
            })
        })
    })
}

exports.getReviewsByProductId = (req, res) => {
    db.Product.findOne({_id: req.params.product_id}, "review")
    .populate({
        path: "review",
        populate:{
            path: "customerId",
            model: "Customer",
            select: "name"
        }
    })
    .then(product => res.send(product))
    .catch(error => res.send(error))
}