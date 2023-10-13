const express = require('express');
const router = express.Router();

// Import Swagger JSDoc for annotations
const swaggerJSDoc = require('swagger-jsdoc');

// Swagger configuration options for this route file
const options = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'User Task API', // Updated title
            version: '1.0.0',
            description: 'API documentation for user tasks in my Node.js application',
        },
    },
    apis: [__filename], // Specify the current route file
};

const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger documentation at /api-docs
router.use('/api-docs', (req, res) => {
    res.json(swaggerSpec);
});

// Import the userTaskController
const userTaskController = require('../Controllers/userTaskController');

/**
 * @swagger
 * tags:
 *   name: User Task
 *   description: User Task Controller
 */

/**
 * @swagger
 * /api/userTasks:
 *   get:
 *     summary: Get all user tasks.
 *     tags: [User Task]
 *     responses:
 *       200:
 *         description: A list of user tasks.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get all user tasks, Successful"
 *               data: [
 *                 {
 *                   id: 0,
 *                   user_username: "user_username",
 *                   task: {
 *                     id: 0,
 *                     name: "name",
 *                     startDay: "date",
 *                     startHour: "time",
 *                     endDay: "date",
 *                     endHour: "time",
 *                     category_task: {
 *                       id: 0,
 *                       name: "name"
 *                     }
 *                   },
 *                   status: {
 *                     id: 0,
 *                     name: "name"
 *                   }
 *                 },{
 *                   id: 1,
 *                   user_username: "user_username2",
 *                   task: {
 *                     id: 1,
 *                     name: "name2",
 *                     startDay: "date2",
 *                     startHour: "time2",
 *                     endDay: "date2",
 *                     endHour: "time2",
 *                     category_task: {
 *                       id: 1,
 *                       name: "name2"
 *                     }
 *                   },
 *                   status: {
 *                     id: 1,
 *                     name: "name2"
 *                   }
 *                 }
 *               ]
 *               "status": 200
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/', userTaskController.getAlluserTask);

/**
 * @swagger
 * /api/userTasks/{userTaskId}:
 *   get:
 *     summary: Get a user task by ID.
 *     tags: [User Task]
 *     parameters:
 *       - in: path
 *         name: userTaskId
 *         required: true
 *         description: The ID of the user task to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user task object.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get user task by ID, Successful"
 *               data: {
 *                   id: 0,
 *                   user_username: "user_username",
 *                   task: {
 *                     id: 0,
 *                     name: "name",
 *                     startDay: "date",
 *                     startHour: "time",
 *                     endDay: "date",
 *                     endHour: "time",
 *                     category_task: {
 *                       id: 0,
 *                       name: "name"
 *                     }
 *                   },
 *                   status: {
 *                     id: 0,
 *                     name: "name"
 *                   }
 *                 }
 *               "status": 200
 *       404:
 *         description: User task not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "User task not found"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/:userTaskId', userTaskController.getUserTaskById);

/**
 * @swagger
 * /api/userTasks/users/{user_username}/tasks/status/{statusId}:
 *   get:
 *     summary: Get user tasks by status.
 *     tags: [User Task]
 *     parameters:
 *       - in: path
 *         name: user_username
 *         required: true
 *         description: The username of the user.
 *         schema:
 *           type: string
 *       - in: path
 *         name: statusId
 *         required: true
 *         description: The ID of the status to filter by.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of user tasks matching the status.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get user tasks by status, Successful"
 *               data: [
 *                 {
 *                   id: 0,
 *                   user_username: "user_username",
 *                   task: {
 *                     id: 0,
 *                     name: "name",
 *                     startDay: "date",
 *                     startHour: "time",
 *                     endDay: "date",
 *                     endHour: "time",
 *                     category_task: {
 *                       id: 0,
 *                       name: "name"
 *                     }
 *                   },
 *                   status: {
 *                     id: 0,
 *                     name: "name"
 *                   }
 *                 }, {
 *                   id: 1,
 *                   user_username: "user_username2",
 *                   task: {
 *                     id: 1,
 *                     name: "name2",
 *                     startDay: "date2",
 *                     startHour: "time2",
 *                     endDay: "date2",
 *                     endHour: "time2",
 *                     category_task: {
 *                       id: 1,
 *                       name: "name2"
 *                     }
 *                   },
 *                   status: {
 *                     id: 1,
 *                     name: "name2"
 *                   }
 *                 }
 *               ]
 *               "status": 200
 *       404:
 *         description: User tasks not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "No user tasks found with the specified status"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/users/:user_username/tasks/status/:statusId', userTaskController.getUserTasksByStatus);

/**
 * @swagger
 * /api/userTasks/users/{user_username}/tasks/{taskId}:
 *   get:
 *     summary: Get user tasks by task ID.
 *     tags: [User Task]
 *     parameters:
 *       - in: path
 *         name: user_username
 *         required: true
 *         description: The username of the user.
 *         schema:
 *           type: string
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of user tasks matching the task ID.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get user tasks by task ID, Successful"
 *               data: [
 *                 {
 *                   id: 0,
 *                   user_username: "user_username",
 *                   task: {
 *                     id: 0,
 *                     name: "name",
 *                     startDay: "date",
 *                     startHour: "time",
 *                     endDay: "date",
 *                     endHour: "time",
 *                     category_task: {
 *                       id: 0,
 *                       name: "name"
 *                     }
 *                   },
 *                   status: {
 *                     id: 0,
 *                     name: "name"
 *                   }
 *                 }, {
 *                   id: 1,
 *                   user_username: "user_username2",
 *                   task: {
 *                     id: 1,
 *                     name: "name2",
 *                     startDay: "date2",
 *                     startHour: "time2",
 *                     endDay: "date2",
 *                     endHour: "time2",
 *                     category_task: {
 *                       id: 1,
 *                       name: "name2"
 *                     }
 *                   },
 *                   status: {
 *                     id: 1,
 *                     name: "name2"
 *                   }
 *                 }
 *               ]
 *               "status": 200
 *       404:
 *         description: User tasks not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "No user tasks found with the specified task ID"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/users/:user_username/tasks/:taskId', userTaskController.getUserTasksByTaskId);

/**
 * @swagger
 * /api/userTasks/users/{user_username}/tasks:
 *   post:
 *     summary: Create a new user task.
 *     tags: [User Task]
 *     parameters:
 *       - in: path
 *         name: user_username
 *         required: true
 *         description: The username of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User task object to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               startDay:
 *                 type: string
 *                 format: date
 *                 example: "date"
 *               startHour:
 *                 type: string
 *                 format: time
 *                 example: "time"
 *               endDay:
 *                 type: string
 *                 format: date
 *                 example: "date"
 *               endHour:
 *                 type: string
 *                 format: time
 *                 example: "time"
 *               category_task_id:
 *                 type: integer
 *                 example: 0
 *             required:
 *               - name
 *               - startDay
 *               - startHour
 *               - endDay
 *               - endHour
 *               - category_task_id
 *     responses:
 *       201:
 *         description: User task created successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "User task created successfully"
 *               data: {
 *                   id: 0,
 *                   user_username: "user_username",
 *                   task: {
 *                     id: 0,
 *                     name: "name",
 *                     startDay: "date",
 *                     startHour: "time",
 *                     endDay: "date",
 *                     endHour: "time",
 *                     category_task: {
 *                       id: 0,
 *                       name: "name"
 *                     }
 *                   },
 *                   status: {
 *                     id: 0,
 *                     name: "name"
 *                   }
 *                 }
 *               "status": 201
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             example:
 *               error: "Bad request"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.post('/users/:user_username/tasks', userTaskController.postUserTask);

/**
 * @swagger
 * /api/userTasks/users/{user_username}/tasks/{taskId}/status/{statusId}:
 *   put:
 *     summary: Update the status of a user task by ID.
 *     tags: [User Task]
 *     parameters:
 *       - in: path
 *         name: user_username
 *         required: true
 *         description: The username of the user.
 *         schema:
 *           type: string
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to update.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: statusId
 *         required: true
 *         description: The new status for the user task.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User task status updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "User task status updated successfully"
 *               data: {
 *                   id: 0,
 *                   user_username: "user_username",
 *                   task: {
 *                     id: 0,
 *                     name: "name",
 *                     startDay: "date",
 *                     startHour: "time",
 *                     endDay: "date",
 *                     endHour: "time",
 *                     category_task: {
 *                       id: 0,
 *                       name: "name"
 *                     }
 *                   },
 *                   status: {
 *                     id: 0,
 *                     name: "name"
 *                   }
 *                 }
 *               "status": 200
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             example:
 *               error: "Bad request"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.put('/users/:user_username/tasks/:taskId/status/:statusId', userTaskController.putUserTaskStatus);

/**
 * @swagger
 * /api/userTasks/users/{user_username}/tasks/{taskId}:
 *   delete:
 *     summary: Delete a user task by task ID.
 *     tags: [User Task]
 *     parameters:
 *       - in: path
 *         name: user_username
 *         required: true
 *         description: The username of the user.
 *         schema:
 *           type: string
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User task deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "User task deleted successfully"
 *               data: null
 *       404:
 *         description: User task not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "User task not found"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.delete('/users/:user_username/tasks/:taskId', userTaskController.deleteUserTask);

/**
 * @swagger
 * /api/userTasks/users/{user_username}/categoryTasks/tasks:
 *   get:
 *     summary: Get user task counts by category.
 *     tags: [User Task]
 *     parameters:
 *       - in: path
 *         name: user_username
 *         required: true
 *         description: The username of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             example:
 *               message: "User task counts by category retrieved successfully"
 *               data: [
 *                 0,
 *                 0,
 *                 0,
 *                 0,
 *               ]
 *       404:
 *         description: No user tasks found for the specified user.
 *         content:
 *           application/json:
 *             example:
 *               error: "No user tasks found for the specified user"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/users/:user_username/categoryTasks/tasks', userTaskController.countUserTasksByCategory);

/**
 * @swagger
 * /api/userTasks/users/{user_username}/categoryTasks/tasks/status/{statusId}:
 *   get:
 *     summary: Get user task counts by category and status.
 *     tags: [User Task]
 *     parameters:
 *       - in: path
 *         name: user_username
 *         required: true
 *         description: The username of the user.
 *         schema:
 *           type: string
 *       - in: path
 *         name: statusId
 *         required: true
 *         type: integer
 *         description: The status ID to filter tasks.
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             example:
 *               message: "User task counts by category and status retrieved successfully"
 *               data: [
 *                 0,
 *                 0,
 *                 0,
 *                 0,
 *               ]
 *       404:
 *         description: No user tasks found for the specified user or status.
 *         content:
 *           application/json:
 *             example:
 *               error: "No user tasks found for the specified user or status"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/users/:user_username/categoryTasks/tasks/status/:statusId', userTaskController.countUserTasksByCategoryAndStatus);

module.exports = router;
