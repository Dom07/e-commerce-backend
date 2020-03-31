const express = require('express')
const helpers = require('../helpers/shoppingCart')

const router = express.Router()

router.get("/view/:customer_id", helpers.viewCart)
router.put("/update", helpers.updateCart)
router.put("/add", helpers.addToCart)
router.put("/removeItem", helpers.removeItemFromCart)

module.exports = router