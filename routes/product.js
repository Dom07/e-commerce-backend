const express = require('express')
const helpers = require('../helpers/product')

const router = express.Router()

router.post('/add', helpers.addProduct)
router.delete('/delete', helpers.deleteProduct)
router.get('/all', helpers.allProduct)
router.get('/getFeatured/:category', helpers.getFeaturedProduct)
router.get('/:id', helpers.getProductById)
router.get('/getProductBySubCategory/:id', helpers.getProductBySubCategory)

module.exports = router