const { calcularIdade } = require('../src/utils');

describe('Cálculo de Idade', () => {
  test('Deve calcular a idade corretamente a partir da data de nascimento', () => {
    const dataNascimento = '2000-05-15';
    
    const idade = calcularIdade(dataNascimento);
    
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idadeEsperada = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idadeEsperada--;
    }

    expect(idade).toBe(idadeEsperada);
  });
});