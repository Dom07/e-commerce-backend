const express = require('express');
const helpers = require('../helpers/subCategory')

const router = express.Router()

router.post('/add', helpers.addSubCategory)
router.delete('/delete', helpers.deleteSubCategory)
router.get('/:category', helpers.getSubCategories)

module.exports = router