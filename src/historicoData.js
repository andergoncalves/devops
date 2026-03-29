const fs = require('fs');
const path = require('path');

const HIST_FILE = path.join(__dirname, 'historico.json');

let historico = [];

// Carrega histórico do arquivo, se existir
try {
  historico = JSON.parse(fs.readFileSync(HIST_FILE, 'utf-8'));
} catch {
  historico = [];
}

// Salva histórico no arquivo
function salvar() {
  fs.writeFileSync(HIST_FILE, JSON.stringify(historico, null, 2), 'utf-8');
}

module.exports = { historico, salvar };