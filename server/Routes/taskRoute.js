// Set up
const express = require('express')
const router = express.Router()

// call Controller
const taskController = require('../Controllers/taskController')

router.get('/', taskController.getAllTasks)
router.get('/:taskId', taskController.getTaskById)
router.put('/:taskId', taskController.putTaskByTaskId)

module.exports = router