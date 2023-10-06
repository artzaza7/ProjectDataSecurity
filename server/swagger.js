const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my Node.js application',
    },
  },
  apis: ['./Routes/*.js'], // Specify the path to your route files (wildcard to include all route files).
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
