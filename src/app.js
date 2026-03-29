const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Middleware JSON
app.use(express.json());

// Histórico compartilhado
const historico = [];
app.locals.historico = historico; // disponível para outras rotas

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas principais
app.use('/calc', require('./routes/calc'));
app.use('/historico', require('./routes/historico'));

// Rota raiz redireciona para docs
app.get('/', (req, res) => {
  res.redirect('/docs');
});

// Rota 404
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

module.exports = app;
module.exports.historico = historico; // para compartilhar array