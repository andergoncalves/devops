const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API DevOps - Calculadora',
      version: '1.0.0',
      description: 'API simples de calculadora com Node.js'
    }
  },
  apis: ['./src/app.js'], // onde estão as rotas documentadas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;