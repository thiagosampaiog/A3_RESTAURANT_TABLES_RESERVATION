
document.addEventListener('DOMContentLoaded', () => {
  const formConfirmar = document.querySelector('form[action="/reserva/confirmar"]');
  formConfirmar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(formConfirmar));
    const resp = await fetch('/reserva/confirmar', {
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