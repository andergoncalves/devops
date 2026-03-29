const express = require('express');
const router = express.Router();
const { historico, salvar } = require('../historicoData');

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

// GET histórico
router.get('/', (req, res) => res.json(historico));

// DELETE histórico
router.delete('/', (req, res) => {
  historico.length = 0;
  salvar();
  res.json({ mensagem: 'Histórico limpo com sucesso' });
});

module.exports = router;