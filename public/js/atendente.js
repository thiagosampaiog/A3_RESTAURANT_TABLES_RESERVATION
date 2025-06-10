document.addEventListener('DOMContentLoaded', () => {

  const formCriar = document.getElementById('formCriar');
  formCriar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(formCriar));

    dados.mesa = Number(dados.mesa);
    dados.pessoas = Number(dados.pessoas);


    console.log(dados);

    const resp = await fetch('/reserva', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    const msg = await resp.json();
    exibirMensagem(msg.message || msg);
    exibirResultado(msg);
  });


  const formCancelar = document.getElementById('formCancelar');
  formCancelar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = formCancelar.id.value;
    const resp = await fetch(`/reserva/${id}`, {
      method: 'DELETE'
    });
    const msg = await resp.json();
    exibirMensagem(msg.message || msg);
    exibirResultado(msg)
  });

  function exibirMensagem(msg) {
    let div = document.getElementById('mensagem');
    let pre = document.getElementById('resultado');
    let texto = '';

    if (Array.isArray(msg)) {
      texto = msg.join(', ');
    } else if (typeof msg === 'object' && msg !== null && msg.message) {
      texto = msg.message;
      if (msg.reservaId) {
        texto += ` (ID: ${msg.reservaId})`;
      }
    } else if (typeof msg === 'string') {
      texto = msg;
    }

    if (!texto || texto.trim() === '') {
      div.style.display = 'none';
      div.textContent = '';
    } else {
      div.style.display = '';
      div.textContent = texto;
      pre.style.display = 'none';
      pre.textContent = '';
    }
  }

  function exibirResultado(resultado) {
    const pre = document.getElementById('resultado');
    const div = document.getElementById('mensagem');
    if (!resultado || (typeof resultado === 'string' && resultado.trim() === '')) {
      pre.style.display = 'none';
      pre.textContent = '';
    } else {
      pre.style.display = '';
      pre.textContent = typeof resultado === 'string' ? resultado : JSON.stringify(resultado, null, 2);
      div.style.display = 'none';
      div.textContent = '';
    }
  }
});