const Axios = require('axios');
const db = require('../models');
const faker = require('faker');

const reviewUrl = "http://localhost:4000/api/review/add";

const loadData = (url, dataSet) => {
    dataSet.forEach(data => {
        Axios.post(url, data)
            .then(res => {
                if(res.data.FAILED){
                    console.log("Product already exists")
                }else{
                    console.log(res.data.SUCCESS.name + " Added to Db")
                }
            })
            .catch(error => console.log(error))
    })
}

const loadUsers = (done) => {
    db.Customer.find({}, "_id shoppingCart name address order")
        .then(customers => done(customers))
        .catch(error => {
            console.log(error)
        })
}

const loadProducts = (done) => {
    db.Product.find({}, "_id price")
        .then(products => done(products))
        .catch(error => console.log(error))
}

const removeSubCatItems = (subCatId, done) => {
    db.Product.deleteMany({subCategory: subCatId})
    .then(() => done())
    .catch(error => console.log(error))
}

const addProductToCart = (url, data) => {
    Axios.put(url, data)
        .then(res => console.log("Item added to cart"))
        .catch(error => console.log(error))
}

const getShoppingCart = (url, done) => {
    Axios.get(url)
        .then(res => done(res.data.SUCCESS.shoppingCart))
        .catch(error => console.log(error))
}

const removeAll = () => {
    db.User.remove({})
        .then(() => console.log("Removed Users"))
        .catch(error => console.log("Error removing users"))

    db.Customer.remove({})
        .then(() => console.log("Removed Customers"))
        .catch(error => console.log("Error removing Customers"))

    db.ShoppingCart.remove({})
        .then(() => console.log("Removed Carts"))
        .catch(error => console.log("Error removing Carts"))

    db.Order.remove({})
        .then(() => console.log("Removed Orders"))
        .catch(error => console.log("Error removing Orders"))

    db.WishList.remove({})
        .then(() => console.log("Removed Wishlists"))
        .catch(error => console.log("Error removing Wishlists"))

    db.Product.remove({})
        .then(() => console.log("Removed Products"))
        .catch(error => console.log("Error removing Products"))

    db.Review.remove({})
        .then(() => console.log("Removed Reviews"))
        .catch(error => console.log("Error removing Reviews"))
}

const writeReview = () => {
    loadUsers(users => {
        users.forEach(user => {
            user.order.forEach(order => {
                db.Order.findById(order)
                .then(order => {
                    order.product.forEach(item =>{
                        Axios.post(reviewUrl, {
                            customer_id: user._id,
                            product_id: item.productId,
                            description: faker.lorem.sentence(),
                            rating: Math.floor(Math.random() * 5) + 1,
                        })
                        .then(res => {
                            if(res.data.SUCCESS){
                                console.log("Review Provided ", res.data.SUCCESS )
                            }else{
                                console.log("Review Provided ", res.data.FAILED)
                            }
                            
                        })
                        .catch(error => console.log("ERROR:", error))
                    })
                })
            })
        })
    })
}

module.exports = {
    loadData,
    loadUsers,
    loadProducts,
    removeSubCatItems,
    addProductToCart,
    getShoppingCart,
    removeAll,
    writeReview
}

