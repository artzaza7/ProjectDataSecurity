const express = require('express');
const router = express.Router();

// Import Swagger JSDoc for annotations
const swaggerJSDoc = require('swagger-jsdoc');

// Swagger configuration options for this route file
const options = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'User API', // Updated title
            version: '1.0.0',
            description: 'API documentation for user-related operations in my Node.js application',
        },
    },
    apis: [__filename], // Specify the current route file
};

const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger documentation at /api-docs
router.use('/api-docs', (req, res) => {
    res.json(swaggerSpec);
});

// Import the userController
const userController = require('../Controllers/userController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Controller
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get all users, Successful"
 *               data: [
 *                {
 *                 username: "username",
 *                 password: "password",
 *                 email: "email",
 *                 firstname: "firstname",
 *                 lastname: "lastname"
 *                },{
 *                 username: "username2",
 *                 password: "password2",
 *                 email: "email2",
 *                 firstname: "firstname2",
 *                 lastname: "lastname2"
 *                }
 *               ]
 *               "status": 200
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Get a user by username.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             example:
 *               message: "Get user by username, Successful"
 *               data: {
 *                 username: "username",
 *                 password: "password",
 *                 email: "email",
 *                 firstname: "firstname",
 *                 lastname: "lastname"
 *               }
 *               "status": 200
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.get('/:username', userController.getUserByUsername);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user.
 *     tags: [User]
 *     requestBody:
 *       description: User registration data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "string"
 *               password:
 *                 type: string
 *                 example: "string"
 *               email:
 *                 type: string
 *                 example: "string"
 *               firstname:
 *                 type: string
 *                 example: "string"
 *               lastname:
 *                 type: string
 *                 example: "string"
 *             required:
 *               - username
 *               - password
 *               - email
 *               - firstname
 *               - lastname
 *     responses:
 *       201:
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             example:
 *               message: "User registration successful"
 *               data: {
 *                 username: "username",
 *                 password: "password",
 *                 email: "email",
 *                 firstname: "firstname",
 *                 lastname: "lastname"
 *               }
 *               "status": 201
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             example:
 *               error: "Bad request."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.post('/register', userController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user.
 *     tags: [User]
 *     requestBody:
 *       description: User login data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "string"
 *               password:
 *                 type: string
 *                 example: "string"
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Login successful"
 *               data: {
 *                 username: "username",
 *                 password: "password",
 *                 email: "email",
 *                 firstname: "firstname",
 *                 lastname: "lastname"
 *               }
 *               "status": 200
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.post('/login', userController.loginUser);

module.exports = router;
