const express = require('express');
const router = express.Router();

// Import Swagger JSDoc for annotations
const swaggerJSDoc = require('swagger-jsdoc');

// Swagger configuration options for this route file
const options = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'Task API', // Updated title
            version: '1.0.0',
            description: 'API documentation for task-related operations in my Node.js application',
        },
    },
    apis: [__filename], // Specify the current route file
};

const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger documentation at /api-docs
router.use('/api-docs', (req, res) => {
    res.json(swaggerSpec);
});

// Import the taskController
const taskController = require('../Controllers/taskController');

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task Controller
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks.
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get all tasks, Successful"
 *               data: [
 *                 {
 *                   id: 0,
 *                   name: "name",
 *                   startDay: "date",
 *                   startHour: "time",
 *                   endDay: "date",
 *                   endHour: "time",
 *                   category_task: {
 *                     id: 0,
 *                     name: "name"
 *                   }
 *                 },
 *                 {
 *                   id: 1,
 *                   name: "name2",
 *                   startDay: "date2",
 *                   startHour: "time2",
 *                   endDay: "date2",
 *                   endHour: "time2",
 *                   category_task: {
 *                     id: 1,
 *                     name: "name2"
 *                   }
 *                 }
 *               ]
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/', taskController.getAllTasks);

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   get:
 *     summary: Get a task by task ID.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A task object.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get task by ID, Successful"
 *               data: {
 *                   id: 0,
 *                   name: "name",
 *                   startDay: "date",
 *                   startHour: "time",
 *                   endDay: "date",
 *                   endHour: "time",
 *                   category_task: {
 *                     id: 0,
 *                     name: "name"
 *                   }
 *                 }
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Task not found"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/:taskId', taskController.getTaskById);

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   put:
 *     summary: Update a task by task ID.
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Task data to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "string"
 *               startDay:
 *                 type: string
 *                 example: "date"
 *               startHour:
 *                 type: string
 *                 example: "time"
 *               endDay:
 *                 type: string
 *                 example: "date"
 *               endHour:
 *                 type: string
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
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Task updated successfully"
 *               data: {
 *                   id: 0,
 *                   name: "name",
 *                   startDay: "date",
 *                   startHour: "time",
 *                   endDay: "date",
 *                   endHour: "time",
 *                   category_task: {
 *                     id: 0,
 *                     name: "name"
 *                   }
 *                 }
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             example:
 *               error: "Bad request"
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Task not found"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.put('/:taskId', taskController.putTaskByTaskId);

module.exports = router;
