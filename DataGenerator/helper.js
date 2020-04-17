const Axios = require('axios');
const db = require('../models');

const loadData = (url, dataSet) => {
    dataSet.forEach(data => {
        Axios.post(url, data)
        .then(res => console.log(res.data.SUCCESS.name + " Added to Db"))
        .catch(error => console.log(error))
    })
}

const loadUsers = (done) => {
    db.Customer.find({}, "_id shoppingCart name address")
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

const addProductToCart = (url, data) => {
    Axios.put(url, data)
    .then(res => console.log("Item added to cart"))
    .catch(error => console.log(error))
}

const getShoppingCart = (url, done) =>{
    Axios.get(url)
    .then(res => done(res.data.SUCCESS.shoppingCart))
    .catch(error => console.log(error))
}

module.exports = {
    loadData, 
    loadUsers,
    loadProducts,
    addProductToCart,
    getShoppingCart
}

