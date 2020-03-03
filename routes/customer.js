const express = require('express');
const helpers = require('../helpers/customer')

const router = express.Router()

router.post('/getCustomer', helpers.getCustomer)
router.post('/addCustomer', helpers.addCustomer)

module.exports = router
