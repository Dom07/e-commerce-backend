var db = require('../models')

/* istanbul ignore next */


exports.addReview = (req, res) => {
    db.Product.findById(req.body.product_id).populate('review')
        .then(product => {
            db.Customer.findById(req.body.customer_id)
                .then(customer => {
                    let responseFlag = false
                    product.review.forEach(rev => {
                        if (rev.customerId.toString() === customer._id.toString()) {
                            responseFlag = true
                        }
                    })
                    if (!responseFlag) {
                        db.Review.create({
                            customerId: customer,
                            description: req.body.description,
                            rating: req.body.rating,
                            date: Date.now()
                        })
                            .then(review => {
                                const oldRatings = product.ratings
                                const oldTotalRatings = product.review.length
                                const ratings = ((oldRatings * oldTotalRatings) + req.body.rating) / (oldRatings + 1)
                                db.Product.findByIdAndUpdate(req.body.product_id,
                                    {
                                        $push: { review: review },
                                        $set: { ratings: ratings }
                                    },
                                    { safe: true, upsert: true }
                                )
                                    .then(() => res.send({ "SUCCESS": true }))
                                    .catch(error => {
                                        console.log(error)
                                        res.send({ "FAILED": true })
                                    })

                            })
                            .catch(error => {
                                console.log(error)
                                res.send({ "FAILED": true })
                            })
                    } else {
                        res.send({ "FAILED": "Review already given" })
                    }
                })
                .catch(error => console.log(error))
        })
        .catch(error => {
            console.log(error)
            res.send({ "FAILED": true })
        })
}

/* istanbul ignore next */

exports.getReviewsByProductId = (req, res) => {
    db.Product.findOne({ _id: req.params.product_id }, "review")
        .populate({
            path: "review",
            populate: {
                path: "customerId",
                model: "Customer",
                select: "name"
            }
        })
        .then(product => res.send(product))
        .catch(error => res.send(error))
}