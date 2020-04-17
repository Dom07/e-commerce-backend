const express = require('express');
const helpers = require('../helpers/category')

const router = express.Router()

router.get('/', helpers.getCategories)
router.post('/add', helpers.addCategory)
router.delete('/delete', helpers.deleteCategory)

module.exports = router
