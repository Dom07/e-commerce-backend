const express = require('express');
const helpers = require('../helpers/subCategory')

const router = express.Router()

router.get('/', helpers.getSubCategories)
router.post('/add', helpers.addSubCategory)
router.delete('/delete', helpers.deleteSubCategory)
router.get('/:category', helpers.getSubCategoryByName)

module.exports = router
