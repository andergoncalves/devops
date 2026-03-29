const swaggerJsdoc = require('swagger-jsdoc');

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
    './routes/*.js', // inclui calc.js e historico.js
    './*.js'         // caso queira incluir outros arquivos na raiz
  ]
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;