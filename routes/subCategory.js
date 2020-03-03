const express = require('express');
const helpers = require('../helpers/subCategory')

const router = express.Router()

router.post('/addSubCategory', helpers.addSubCategory)

module.exports = router
