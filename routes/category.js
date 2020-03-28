const express = require('express');
const helpers = require('../helpers/category')

const router = express.Router()

router.post('/add', helpers.addCategory)
router.delete('/delete', helpers.deleteCategory)

module.exports = router
