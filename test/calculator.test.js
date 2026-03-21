const calc = require('../src/calculator');

describe('Calculadora', () => {

  test('soma', () => {
    expect(calc.soma(2, 3)).toBe(5);
  });

  test('subtração', () => {
    expect(calc.subtracao(5, 3)).toBe(2);
  });

  test('multiplicação', () => {
    expect(calc.multiplicacao(2, 4)).toBe(8);
  });

  test('divisão', () => {
    expect(calc.divisao(10, 2)).toBe(5);
  });

  test('divisão por zero', () => {
    expect(() => calc.divisao(10, 0)).toThrow('Divisão por zero');
  });

});