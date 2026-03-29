const express = require('express');
const calc = require('./calculator');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

// 🔥 Middleware para JSON
app.use(express.json());

// 🔥 Histórico em memória
const historico = [];

// 🔥 Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🔥 ROTA RAIZ
/**
 * @swagger
 * /:
 *   get:
 *     summary: Redireciona para o Swagger UI
 *     responses:
 *       302:
 *         description: Redirecionamento para /docs
 */
app.get('/', (req, res) => {
  res.redirect('/docs');
});

// 🔥 ROTA CALC
/**
 * @swagger
 * /calc:
 *   get:
 *     summary: Realiza operações matemáticas via query params
 *     parameters:
 *       - in: query
 *         name: op
 *         schema:
 *           type: string
 *         required: true
 *         description: Operação: soma, sub, mult, div
 *       - in: query
 *         name: a
 *         schema:
 *           type: number
 *         required: true
 *       - in: query
 *         name: b
 *         schema:
 *           type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Resultado do cálculo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultado:
 *                   type: number
 *   post:
 *     summary: Realiza operações matemáticas via body JSON
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - op
 *               - a
 *               - b
 *             properties:
 *               op:
 *                 type: string
 *               a:
 *                 type: number
 *               b:
 *                 type: number
 *     responses:
 *       200:
 *         description: Resultado do cálculo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultado:
 *                   type: number
 */
app.get('/calc', (req, res) => {
  const { op, a, b } = req.query;
  processCalc(op, a, b, res);
});

app.post('/calc', (req, res) => {
  const { op, a, b } = req.body;
  processCalc(op, a, b, res);
});

// 🔥 FUNÇÃO DE PROCESSAMENTO DO CÁLCULO
function processCalc(op, a, b, res) {
  const numA = Number(a);
  const numB = Number(b);

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

    // 🔥 Salvar histórico
    historico.push({
      operacao: op,
      a: numA,
      b: numB,
      resultado,
      data: new Date().toISOString()
    });

    res.json({ resultado });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

// 🔥 HISTÓRICO GET
/**
 * @swagger
 * /historico:
 *   get:
 *     summary: Lista histórico de operações
 *     responses:
 *       200:
 *         description: Lista de operações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   operacao:
 *                     type: string
 *                   a:
 *                     type: number
 *                   b:
 *                     type: number
 *                   resultado:
 *                     type: number
 *                   data:
 *                     type: string
 *                     format: date-time
 */
app.get('/historico', (req, res) => {
  res.json(historico);
});

// 🔥 HISTÓRICO DELETE
/**
 * @swagger
 * /historico:
 *   delete:
 *     summary: Limpa histórico de operações
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 */
app.delete('/historico', (req, res) => {
  historico.length = 0;
  res.json({ mensagem: 'Histórico limpo com sucesso' });
});

// 🔥 ROTA 404 (Handler final)
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

module.exports = app;