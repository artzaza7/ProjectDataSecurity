// Set up
const express = require('express')
const router = express.Router()

// call Controller
const userTaskController = require('../Controllers/userTaskController')

router.get('/', userTaskController.getAlluserTask)
router.get('/:userTaskId', userTaskController.getUserTaskById)
router.get('/users/:user_username/tasks/status/:statusId', userTaskController.getUserTasksByStatus)
router.get('/users/:user_username/tasks/:taskId', userTaskController.getUserTasksByTaskId)
router.post('/users/:user_username/tasks', userTaskController.postUserTask)
router.delete('/users/:user_username/tasks/:taskId', userTaskController.deleteUserTask)

module.exports = router