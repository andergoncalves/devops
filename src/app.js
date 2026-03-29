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
app.get('/', (req, res) => {
  res.redirect('/docs');
});

/**
 * 🔥 CALCULAR - USANDO GET (para query) ou POST (para body)
 * GET /calc?op=soma&a=2&b=3
 * POST /calc { op: 'soma', a: 2, b: 3 }
 */
app.route('/calc')
  .get((req, res) => {
    const { op, a, b } = req.query;
    processCalc(op, a, b, res);
  })
  .post((req, res) => {
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

/**
 * 🔥 HISTÓRICO
 * GET /historico -> listar
 * DELETE /historico -> limpar
 */
app.route('/historico')
  .get((req, res) => {
    res.json(historico);
  })
  .delete((req, res) => {
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