const express = require('express')
const helpers = require('../helpers/review')

const router = express.Router()

router.post('/add', helpers.addReview)
router.get('/getReviews/:product_id', helpers.getReviewsByProductId)

module.exports = router