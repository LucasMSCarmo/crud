const API_URL = 'http://localhost:3000/pessoas';

document.getElementById('pessoa-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const cpf = document.getElementById('cpf').value;
  const nome = document.getElementById('nome').value;
  const dataNascimento = document.getElementById('dataNascimento').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cpf, nome, dataNascimento })
  });

  document.getElementById('pessoa-form').reset();
  carregarPessoas();
});

async function carregarPessoas() {
  const res = await fetch(API_URL);
  const pessoas = await res.json();
  const tbody = document.getElementById('tabela-pessoas');
  tbody.innerHTML = '';

  pessoas.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.cpf}</td>
      <td>${p.nome}</td>
      <td>${p.dataNascimento}</td>
      <td>${p.idade} anos</td>
    `;
    tbody.appendChild(tr);
  });
}

carregarPessoas();