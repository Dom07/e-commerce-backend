const express = require('express')
const helpers = require('../helpers/order')

const router = express.Router()

router.post('/placeOrder', helpers.placeOrder)
router.get('/getOrders/:customerId', helpers.getOrders)

module.exports = router