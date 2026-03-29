const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API DevOps - Calculadora',
      version: '1.0.1',
      description: 'API simples de calculadora com Node.js'
    }
  },
  apis: [
    path.join(__dirname, 'routes', '*.js').replace(/\\/g, '/'),
    path.join(__dirname, '*.js').replace(/\\/g, '/')
  ]
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;