const helper = require('./helper');
const Laptops = require('./Laptops');
const Mobiles = require('./Mobiles');
const Users = require('./Users');
const Jacket = require('./jacket')
const Shoes = require('./shoes');
const Books = require('./books');
const Games = require('./games');
const Axios = require('axios');


const productUrl = "http://localhost:4000/api/product/add"
const customerUrl = "http://localhost:4000/api/customer/addCustomer"
const cartUrl = "http://localhost:4000/api/shoppingCart/add"
const getCartUrl = "http://localhost:4000/api/shoppingCart/view/"
const placeOrder = "http://localhost:4000/api/order/placeOrder"

switch (process.argv[2]) {
    case "laptop": {
        helper.loadData(productUrl, Laptops)
        break;
    }

    case "mobile": {
        helper.loadData(productUrl, Mobiles)
        break;
    }

    case "user": {
        helper.loadData(customerUrl, Users)
        break;
    }

    case "jacket":{
        helper.loadData(productUrl, Jacket)
        break;
    }

    case "shoes":{
        helper.loadData(productUrl, Shoes)
        break;
    }

    case "books":{
        helper.loadData(productUrl, Books)
        break;
    }

    case "games":{
        helper.loadData(productUrl, Games)
        break;
    }

    case "removeItemInSub":{
        helper.removeSubCatItems(process.argv[3], () => {
            console.log("Items in specified subCat removed")
        })
        break;
    }

    case "addToCart": {
        helper.loadUsers(data => {
            let users = data
            helper.loadProducts(products => {
                users.forEach(user => {
                    helper.addProductToCart(cartUrl, {
                        customer_id: user._id,
                        product_id: products[Math.floor(Math.random() * products.length)]
                    })

                    helper.addProductToCart(cartUrl, {
                        customer_id: user._id,
                        product_id: products[Math.floor(Math.random() * products.length)]
                    })
                })
            })
        })
        break;
    }

    case "placeOrder": {
        helper.loadUsers(data => {
            let users = data
            users.forEach(user => {    
                helper.getShoppingCart(getCartUrl+user._id, data => {
                    let totalPrice = 0
                    let products = data.products
                    products.forEach(item => {
                        totalPrice +=item.productId.price
                    })
                    Axios.post(placeOrder, {
                        shippingAddress: user.address,
                        totalPrice: totalPrice,
                        cardHolderName: user.name,
                        cardNumber: 12340560606,
                        expiryDate: new Date("January 20, 2023 00:00:00"),
                        CVV: 123,
                        shoppingCartId: data._id,
                        customer_id: user._id,
                        products: products
                    })
                    .then(res => console.log(res.data))
                    .catch(error => console.log(error))
                })
            })
        })
        break;
    }

    case "giveReview":{
        helper.writeReview()
        break;
    }
    case "removeAll":{
        helper.removeAll()
        break;
    }

    default: {
        console.log(`Invalid input: ${process.argv[2]}`)
    }
}