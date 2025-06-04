document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const url = form.action;
      const params = new URLSearchParams(new FormData(form)).toString();
      const resp = await fetch(`${url}?${params}`);
      const msg = await resp.text();
      exibirMensagem(msg);
    });
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