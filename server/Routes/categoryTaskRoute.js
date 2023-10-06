const express = require('express');
const router = express.Router();

// Import Swagger JSDoc for annotations
const swaggerJSDoc = require('swagger-jsdoc');

// Swagger configuration options for this route file
const options = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'Category Task API', // Updated title
            version: '1.0.0',
            description: 'API documentation for category task-related operations in my Node.js application',
        },
    },
    apis: [__filename], // Specify the current route file
};

const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger documentation at /api-docs
router.use('/api-docs', (req, res) => {
    res.json(swaggerSpec);
});

// Import the categoryTaskController
const categoryTaskController = require('../Controllers/categoryTaskController');

/**
 * @swagger
 * tags:
 *   name: Category Task
 *   description: Category Task Controller
 */

/**
 * @swagger
 * /api/categoryTasks:
 *   get:
 *     summary: Get all category tasks.
 *     tags: [Category Task]
 *     responses:
 *       200:
 *         description: A list of category tasks.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get all category tasks, Successful"
 *               data: [
 *                 {
 *                   id: 0,
 *                   name: "name"
 *                 },
 *                 {
 *                   id: 1,
 *                   name: "name2"
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

router.get('/', categoryTaskController.getAllCategoryTasks);

/**
 * @swagger
 * /api/categoryTasks/{categoryTaskId}:
 *   get:
 *     summary: Get a category task by category task ID.
 *     tags: [Category Task]
 *     parameters:
 *       - in: path
 *         name: categoryTaskId
 *         required: true
 *         description: The ID of the category task to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A category task object.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get category task by ID, Successful"
 *               data: {
 *                   id: 0,
 *                   name: "name"
 *                 }
 *               "status": 200
 *       404:
 *         description: Category task not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Category task not found"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/:categoryTaskId', categoryTaskController.getCategoryTaskById);

module.exports = router;
