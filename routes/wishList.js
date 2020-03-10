const express = require('express');
const helpers = require('../helpers/wishlist')

const router = express.Router()

router.post('/add', helpers.addToWishlist)

module.exports = router
