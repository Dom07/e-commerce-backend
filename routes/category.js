const express = require('express');
const helpers = require('../helpers/category')

const router = express.Router()

router.post('/addCategory', helpers.addCategory)

module.exports = router
