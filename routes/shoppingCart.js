const express = require('express')
const helpers = require('../helpers/shoppingCart')

const router = express.Router()

router.get("/view", helpers.viewCart)
router.put("/update", helpers.updateCart)
router.put("/add", helpers.addToCart)

module.exports = router