const mongoose = require('mongoose');

// Db connection 
mongoose.connect("mongodb://dom:njit1234@ds125862.mlab.com:25862/heroku_b7vm75fw", 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }, 
    error=> console.log(error));

// All model exports
module.exports.Admin = require('./admin');
module.exports.Category = require('./category')
module.exports.Customer = require('./customer')
module.exports.Order = require('./order')
module.exports.PaymentDetails = require('./paymentDetails')
module.exports.Product = require('./product')
module.exports.Review = require('./review')
module.exports.ShoppingCart = require('./shoppingCart')
module.exports.User = require('./user')
module.exports.WishList = require('./wishlist')
module.exports.SubCategory = require('./subCategory')