const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API DevOps - Calculadora',
      version: '1.0.0',
      description: 'API simples de calculadora com Node.js'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: [
    path.join(__dirname, 'routes', '*.js'),
    path.join(__dirname, '*.js')
  ]
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;