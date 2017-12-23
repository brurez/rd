/*
  *** RD TRACKER ***

  no navegador fica exposto rdTracker.init() e rdTracker.setUser()

  codigo obrigatorio ser adicionado em cada pagina:

  <script src="https://rdtracker.herokuapp.com//public/tracker.js"></script>
  <script>rdTracker.init()</script>

  para registar um usuario eh soh adicionar o seguinte formulario:

  <form id="rd-form">
      <label for="name">Nome</label>
          <input id="name" name="name" type="text">
          <label for="email">Email</label>
          <input id="email" name="email" type="text">
      <button type="submit">Registrar</button>
  </form>

  o evento submit de #rd-form eh automaticamente vinculado ao setUser

  as seguintes configuracoes podem ser passadas (esses sao os valores padrao):

  <script>
  rdTracker.init({
      tag: 'rd-tracker',
      server: 'https://rdtracker.herokuapp.com/',
      formId: 'rd-form'
  })
  </script>

  pode ser registrado o usuario utilizando um script personalizado executando
  setUser dessa maneira na funcao passada a algum evento:

  rdTracker.setUser({ name: 'João da Silva Sauro', email: 'joao@sauro.com'})

*/

import rdTracker from './rd-tracker';

// *** Interface pública do rastreador ***


// obrigatorio ser executado na pagina para rastrear

const init = function(config) {
  const tracker = new rdTracker(config);

  // se existir um formulario #rd-tracker setUser eh associado ao evento submit
  if (document.getElementById(tracker.formId))
    document
      .getElementById(tracker.formId)
      .addEventListener('submit', tracker.submit.bind(tracker));

  // adiciona a pagina atual ao historico
  tracker.addPage();

  // tenta enviar o historico para o servidor e limpar o historico do cookie
  tracker.sendAndCleanHistory().catch(err => console.log(err));
};

// opcional para o usuario

const setUser = function(name, email) {
  const tracker = new rdTracker();
  tracker.setUser(name, email);
};

export {
  init,
  setUser,
};
