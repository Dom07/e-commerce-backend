const express = require('express')
const helpers = require('../helpers/product')

const router = express.Router()

router.post('/addProduct', helpers.addProduct)

module.exports = router