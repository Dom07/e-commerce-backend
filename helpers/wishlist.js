const db = require('../models')

exports.addToWishlist = (req, res) => {
    db.Customer.findById({_id: req.body.customer_id})
    .then(customer => {
        db.Product.findById({_id: req.body.product_id})
        .then(product => {
            db.WishList.findById({_id: customer.wishList})
            .then(wishlist => {
                wishlist.products.push(product)
                wishlist.save().then(() => res.send({"SUCCESS": true}))
            })
        })
    })
}