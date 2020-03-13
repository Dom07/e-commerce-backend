const express = require('express')
const helpers = require('../helpers/product')

const router = express.Router()

router.post('/add', helpers.addProduct)
router.delete('/delete', helpers.deleteProduct)
router.get('/all', helpers.allProduct)

module.exports = router