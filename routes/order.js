const express = require('express')
const helpers = require('../helpers/order')

const router = express.Router()

router.post('/placeOrder', helpers.placeOrder)

module.exports = router