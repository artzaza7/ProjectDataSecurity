// Set up
const express = require('express')
const router = express.Router()

// call Controller
const userController = require('../Controllers/userController')

router.get('/', userController.getAllUser)

module.exports = router