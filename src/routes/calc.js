const express = require('express');
const router = express.Router();
const calc = require('../calculator');
const historico = require('../historicoData');

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
router.get('/', (req, res) => {
  const { op, a, b } = req.query;
  processCalc(op, a, b, res);
});

router.post('/', (req, res) => {
  const { op, a, b } = req.body;
  processCalc(op, a, b, res);
});

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
        /*break;*/
      case 'sub':
        resultado = calc.subtracao(numA, numB);
        /*break;*/
      case 'mult':
        resultado = calc.multiplicacao(numA, numB);
        /*break;*/
      case 'div':
        resultado = calc.divisao(numA, numB);
        /*break;*/
      default:
        return res.status(400).json({ erro: 'Operação inválida' });
    }

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

module.exports = router;