// Set up
const express = require('express')
const router = express.Router()

// call Controller
const categoryTaskController = require('../Controllers/categoryTaskController')

router.get('/', categoryTaskController.getAllCategoryTasks)
router.get('/:categoryTaskId', categoryTaskController.getCategoryTaskById)

module.exports = router