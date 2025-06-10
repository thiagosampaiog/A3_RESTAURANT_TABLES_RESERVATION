document.addEventListener('DOMContentLoaded', () => {
 
  document.getElementById('formPeriodo').onsubmit = async function(e) {
    e.preventDefault();
    const inicio = this.inicio.value;
    const fim = this.fim.value;
    const resp = await fetch(`/relatorio/periodo?inicio=${inicio}&fim=${fim}`);
    const data = await resp.json();
    mostrarResultado(data);
  };

  
  document.getElementById('formMesa').onsubmit = async function(e) {
    e.preventDefault();
    const mesa = this.mesa.value;
    const resp = await fetch(`/relatorio/mesa/${mesa}`);
    const data = await resp.json();
    mostrarResultado(data);
  };


  document.getElementById('formGarcom').onsubmit = async function(e) {
    e.preventDefault();
    const garcom = this.garcom.value;
    const resp = await fetch(`/relatorio/garcom/${encodeURIComponent(garcom)}`);
    const data = await resp.json();
    mostrarResultado(data);
  };

  function mostrarResultado(data) {
    const div = document.getElementById('mensagem');
    const pre = document.getElementById('resultado');
    if (Array.isArray(data)) {
      div.textContent = '';
      pre.textContent = JSON.stringify(data, null, 2);
    } else if (data.message) {
      div.textContent = data.message;
      pre.textContent = '';
    } else {
      div.textContent = '';
      pre.textContent = JSON.stringify(data, null, 2);
    }
  }
});