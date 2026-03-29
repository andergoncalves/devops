const express = require('express');
const calc = require('./calculator');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

// 🔥 Histórico em memória
const historico = [];

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * 🔥 ROTA RAIZ
 */
app.get('/', (req, res) => {
  res.redirect('/docs');
});

/**
 * 🔥 CALCULADORA
 */
app.get('/calc', (req, res) => {
  const { op, a, b } = req.query;

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

    // 🔥 SALVAR HISTÓRICO
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
});

/**
 * 🔥 LISTAR HISTÓRICO
 */
app.get('/historico', (req, res) => {
  res.json(historico);
});

/**
 * 🔥 LIMPAR HISTÓRICO
 */
app.delete('/historico', (req, res) => {
  historico.length = 0;
  res.json({ mensagem: 'Histórico limpo com sucesso' });
});

/**
 * 🔥 404
 */
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

module.exports = app;