const request = require('supertest');
const app = require('../src/app');

describe('Testes de Integração - API CRUD Pessoa', () => {
  let pessoaId;

  test('POST /pessoas - Deve criar uma nova pessoa com idade calculada', async () => {
    const res = await request(app)
      .post('/pessoas')
      .send({
        cpf: '123.456.789-00',
        nome: 'João Silva',
        dataNascimento: '2000-01-01',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('João Silva');
    expect(res.body).toHaveProperty('idade');
    pessoaId = res.body.id;
  });

  test('GET /pessoas - Deve listar todas as pessoas', async () => {
    const res = await request(app).get('/pessoas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('PUT /pessoas/:id - Deve atualizar os dados de uma pessoa', async () => {
    const res = await request(app)
      .put(`/pessoas/${pessoaId}`)
      .send({
        cpf: '123.456.789-00',
        nome: 'João Silva Editado',
        dataNascimento: '2000-01-01',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('João Silva Editado');
  });

  test('DELETE /pessoas/:id - Deve remover uma pessoa', async () => {
    const res = await request(app).delete(`/pessoas/${pessoaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.mensagem).toBe('Pessoa removida com sucesso');
  });
});