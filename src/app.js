const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use(express.json());

// Rotas
app.use('/calc', require('./routes/calc'));
app.use('/historico', require('./routes/historico'));

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz redireciona para docs
app.get('/', (req, res) => res.redirect('/docs'));

// 404
app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));

module.exports = app;