document.addEventListener('DOMContentLoaded', () => {
  // Criar Reserva
  const formCriar = document.querySelector('form[action="/reserva/criar"]');
  formCriar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(formCriar));
    const resp = await fetch('/reserva/criar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dados)
    });
    const msg = await resp.text();
    exibirMensagem(msg);
  });

  // Cancelar Reserva
  const formCancelar = document.querySelector('form[action="/reserva/cancelar"]');
  formCancelar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(formCancelar));
    const resp = await fetch('/reserva/cancelar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dados)
    });
    const msg = await resp.text();
    exibirMensagem(msg);
  });

  function exibirMensagem(msg) {
    let div = document.getElementById('mensagem');
    if (!div) {
      div = document.createElement('div');
      div.id = 'mensagem';
      document.body.appendChild(div);
    }
    div.textContent = msg;
  }
});