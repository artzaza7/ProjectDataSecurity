// Set up
const express = require('express')
const router = express.Router()

// call Controller
const statusController = require('../Controllers/statusController')

router.get('/', statusController.getAllStatuses)
router.get('/:statusId', statusController.getStatusById)

module.exports = router