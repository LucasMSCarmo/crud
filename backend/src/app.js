const express = require('express');
const cors = require('cors');
const { calcularIdade } = require('./utils');

const app = express();

// Permite que o frontend acesse o backend via requisições HTTP (CORS)
app.use(cors());
app.use(express.json());

let pessoas = [];
let proximoId = 1;

// Criar (POST)
app.post('/pessoas', (req, res) => {
  const { cpf, nome, dataNascimento } = req.body;
  
  if (!cpf || !nome || !dataNascimento) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
  }

  const idade = calcularIdade(dataNascimento);
  const novaPessoa = { id: proximoId++, cpf, nome, dataNascimento, idade };
  
  pessoas.push(novaPessoa);
  return res.status(201).json(novaPessoa);
});

// Listar (GET)
app.get('/pessoas', (req, res) => {
  return res.status(200).json(pessoas);
});

// Atualizar (PUT)
app.put('/pessoas/:id', (req, res) => {
  const { id } = req.params;
  const { cpf, nome, dataNascimento } = req.body;
  
  const index = pessoas.findIndex(p => p.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ erro: 'Pessoa não encontrada' });
  }

  const idade = calcularIdade(dataNascimento);
  pessoas[index] = { id: parseInt(id), cpf, nome, dataNascimento, idade };

  return res.status(200).json(pessoas[index]);
});

// Deletar (DELETE)
app.delete('/pessoas/:id', (req, res) => {
  const { id } = req.params;
  const index = pessoas.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ erro: 'Pessoa não encontrada' });
  }

  pessoas.splice(index, 1);
  return res.status(200).json({ mensagem: 'Pessoa removida com sucesso' });
});

module.exports = app;