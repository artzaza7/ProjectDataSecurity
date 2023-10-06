const express = require('express');
const router = express.Router();

// Import Swagger JSDoc for annotations
const swaggerJSDoc = require('swagger-jsdoc');

// Swagger configuration options for this route file
const options = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'Status API', // Updated title
            version: '1.0.0',
            description: 'API documentation for status-related operations in my Node.js application',
        },
    },
    apis: [__filename], // Specify the current route file
};

const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger documentation at /api-docs
router.use('/api-docs', (req, res) => {
    res.json(swaggerSpec);
});

// Import the statusController
const statusController = require('../Controllers/statusController');

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: Status Controller
 */

/**
 * @swagger
 * /api/statuses:
 *   get:
 *     summary: Get all statuses.
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: A list of statuses.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get all statuses, Successful"
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
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"

 */

router.get('/', statusController.getAllStatuses);

/**
 * @swagger
 * /api/statuses/{statusId}:
 *   get:
 *     summary: Get a status by status ID.
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: statusId
 *         required: true
 *         description: The ID of the status to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A status object.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get status by ID, Successful"
 *               data: {
 *                   id: 0,
 *                   name: "name"
 *                 }
 *       404:
 *         description: Status not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Status not found"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/:statusId', statusController.getStatusById);

module.exports = router;
