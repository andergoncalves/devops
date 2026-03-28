const express = require('express');
const calc = require('./calculator');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * 🔥 ROTA RAIZ (resolve o "Cannot GET /")
 */
app.get('/', (req, res) => {
  res.redirect('/docs');
});

/**
 * @swagger
 * /calc:
 *   get:
 *     summary: Realiza operações matemáticas
 *     description: Soma, subtração, multiplicação ou divisão
 *     parameters:
 *       - in: query
 *         name: op
 *         schema:
 *           type: string
 *           enum: [soma, sub, mult, div]
 *         required: true
 *         description: Operação
 *       - in: query
 *         name: a
 *         schema:
 *           type: number
 *         required: true
 *         description: Primeiro número
 *       - in: query
 *         name: b
 *         schema:
 *           type: number
 *         required: true
 *         description: Segundo número
 *     responses:
 *       200:
 *         description: Resultado da operação
 *       400:
 *         description: Erro na requisição
 */

app.get('/calc', (req, res) => {
  const { op, a, b } = req.query;

  const numA = Number(a);
  const numB = Number(b);

  // 🔥 Validação de entrada
  if (!op || isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({ erro: 'Parâmetros inválidos' });
  }

  try {
    let resultado;

    switch (op) {
      case 'soma':
        resultado = calc.soma(numA, numB);
        break;
      case 'sub':
        resultado = calc.subtracao(numA, numB);
        break;
      case 'mult':
        resultado = calc.multiplicacao(numA, numB);
        break;
      case 'div':
        resultado = calc.divisao(numA, numB);
        break;
      default:
        return res.status(400).json({ erro: 'Operação inválida' });
    }

    res.json({ resultado });

  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

/**
 * 🔥 ROTA 404 (boa prática)
 */
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

module.exports = app;