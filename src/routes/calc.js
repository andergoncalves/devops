const express = require('express');
const router = express.Router();
const calc = require('../calculator');
const { historico, salvar } = require('../historicoData');

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
 *         description: "Operação: soma, sub, mult, div"
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
 *         description: "Resultado do cálculo"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultado:
 *                   type: number
 *       400:
 *         description: "Parâmetros inválidos"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
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
 *                 description: "Operação: soma, sub, mult, div"
 *               a:
 *                 type: number
 *               b:
 *                 type: number
 *     responses:
 *       200:
 *         description: "Resultado do cálculo"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultado:
 *                   type: number
 *       400:
 *         description: "Parâmetros inválidos"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 */

// Função de processamento do cálculo
function processCalc(op, a, b, res) {
  const numA = Number(a);
  const numB = Number(b);

  if (!op || isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({ erro: 'Parâmetros inválidos' });
  }

  try {
    const operacoes = {
      soma: calc.soma,
      sub: calc.subtracao,
      mult: calc.multiplicacao,
      div: calc.divisao
    };

    const func = operacoes[op];
    if (!func) return res.status(400).json({ erro: 'Operação inválida' });

    const resultado = func(numA, numB);

    historico.push({ operacao: op, a: numA, b: numB, resultado, data: new Date().toISOString() });
    salvar();

    res.json({ resultado });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

// Rotas
router.get('/', (req, res) => {
  const { op, a, b } = req.query;
  processCalc(op, a, b, res);
});

router.post('/', (req, res) => {
  const { op, a, b } = req.body;
  processCalc(op, a, b, res);
});

module.exports = router;