// Set up
const express = require('express')
const router = express.Router()

// call Controller
const userController = require('../Controllers/userController')

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a user by username
router.get('/:username', userController.getUserByUsername);

// Route to register a new user
router.post('/register', userController.registerUser);

// Route to login a user
router.post('/login', userController.loginUser);

module.exports = router