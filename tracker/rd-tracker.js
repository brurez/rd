import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies(); //private

let instance; //força singleton

const RdTracker = function (configObj = {}) {
  // se configObj: { forceNew: true } eh retornado novo objeto e instance eh atulizado
  if (instance && !configObj.forceNew) return instance;
  // nome do cookie padrao
  this.tag = configObj.tag ? configObj.tag : 'rd-tracker';
  this.server = configObj.server ? configObj.server : process.env.serverURL; //valor do webpack
  // id padrao do formulario
  this.formId = configObj.formId ? configObj.formId : 'rd-form';
  if (!cookies.get(this.tag)) {
    this._setCookie({
      uuid: guid(),
      name: configObj.name,
      email: configObj.email,
      history: [],
    });
  }

  instance = this;
};

// Pega informacoes do cookie como se fossem suas propriedades

Object.defineProperty(RdTracker.prototype, 'name', {
  get: function () {
    return this.getUser().name;
  },
});
Object.defineProperty(RdTracker.prototype, 'email', {
  get: function () {
    return this.getUser().email;
  },
});

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid() {
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
}

// ====================

// métodos usados internamente e para teste

RdTracker.prototype._getHistory = function () {
  return cookies.get(this.tag).history;
};

RdTracker.prototype._getCookie = function () {
  return cookies.get(this.tag);
};

RdTracker.prototype._setCookie = function (value) {
  cookies.set(this.tag, value, {
    expires: expirationDate(),
  });

  function expirationDate() {
    const now = new Date();
    //debugger;
    const time = now.getTime();
    const expireTime = time + 1000 * 60 * 60 * 24 * 365;
    now.setTime(expireTime);
    //console.log(now.toUTCString());
    return now;
  }
};

// ====================

RdTracker.prototype.setUser = function (name, email) {
  const cookie = cookies.get(this.tag);
  cookie.name = name;
  cookie.email = email;
  this._setCookie(cookie);

  axios.post(this.server + '/api/contacts', cookie).then(res => console.log(res));

};

RdTracker.prototype.getUser = function () {
  const {name, email} = cookies.get(this.tag);
  return {name, email};
};

// adiciona a pagina atual ao historico de visitas do cookie
RdTracker.prototype.addPage = function () {
  const cookie = cookies.get(this.tag);
  cookie.history.push({
    visitedAt: new Date(),
    url: window.location.host + window.location.pathname,
  });

  this._setCookie(cookie);
};

/*
  cookie.history contem a lista de páginas visitadas
  ainda nao enviadas para o servidor.
  Depois que envia para o servidor, essa lista eh apagada do cookie
*/

// limpa o historico de visitas do cookie
RdTracker.prototype.cleanHistory = function () {
  const cookie = cookies.get(this.tag);
  cookie.history = [];
  this._setCookie(cookie);
};

// manda o array com historico de visitas (history) para o servidor e
// limpa o historico do cookie
RdTracker.prototype.sendAndCleanHistory = function () {
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
RdTracker.prototype.submit = function (e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  this.setUser(name, email);
};

Object.freeze(RdTracker);

export default RdTracker;
