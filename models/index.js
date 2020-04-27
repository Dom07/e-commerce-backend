const mongoose = require('mongoose');

// Db connection 
mongoose.connect("mongodb://localhost:27017/eCommerce", 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    }, 
    error => error ? console.log(error): null);

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
module.exports.SubCategory = require('./subCategory')