import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies(); //private

let instance; //força singleton

const rdTracker = function(configObj = {}) {
  if (instance) return instance;
  // nome do cookie padrao
  this.tag = configObj.tag ? configObj.tag : 'rd-tracker';
  this.server = configObj.server ? configObj.server : process.env.serverURL;
  // id padrao do formulario
  this.formId = configObj.formId ? configObj.formId : 'rd-form';
  if (!cookies.get(this.tag)) {
    cookies.set(this.tag, {
      uuid: this._guid(),
      name: configObj.name,
      email: configObj.email,
      history: [],
    });
  }

  instance = this;
};

// usados internamente e para testes
rdTracker.prototype._getHistory = function() {
  return cookies.get(this.tag).history;
};

rdTracker.prototype._getCookie = function() {
  return cookies.get(this.tag);
};

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
rdTracker.prototype._guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
};
// ====================

rdTracker.prototype.setUser = function(name, email) {
  const cookie = cookies.get(this.tag);
  cookie.name = name;
  cookie.email = email;
  cookies.set(this.tag, cookie);
};

// adiciona a pagina atual ao historico de visitas do cookie
rdTracker.prototype.addPage = function() {
  const cookie = cookies.get(this.tag);
  cookie.history.push({
    visitedAt: new Date(),
    url: window.location.host + window.location.pathname,
  });

  console.log(cookie);

  cookies.set(this.tag, cookie);
};

/*
  cookie.history contem a lista de páginas visitadas
  ainda nao enviadas para o servidor.
  Depois que envia para o servidor, essa lista eh apagada do cookie
*/

// limpa o historico de visitas do cookie
rdTracker.prototype.cleanHistory = function() {
  const cookie = cookies.get(this.tag);
  cookie.history = [];
  cookies.set(this.tag, cookie);
};

// manda o array com historico de visitas (history) para o servidor e
// limpa o historico do cookie
rdTracker.prototype.sendAndCleanHistory = function() {
  return new Promise((resolve, reject) => {
    const cookie = cookies.get(this.tag);
    axios
      .post(this.server + '/api/visits', cookie)
      .then(res => {
        if (res.data === 'ok') {
          // se a resposta for ok significa que o servidor já registrou as visitas
          // entao pode apagar do cookie a lista de paginas visitadas
          this.cleanHistory();
        }
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};

// acao quando o usuario se registra com o formulario
rdTracker.prototype.submit = function(e) {
  const name = e.target.name.value;
  const email = e.target.email.value;
  this.setUser(name, email);
};

export default rdTracker;
