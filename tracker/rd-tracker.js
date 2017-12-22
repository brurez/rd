import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies(); //private

let instance; //force singleton

const rdTracker = function(configObj = {}) {
  if (instance) return instance;
  this.tag = configObj.tag ? configObj.tag : 'rd-tracker';
  this.server = configObj.server ? configObj.server : 'http://localhost:5000';
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

rdTracker.prototype._getHistory = function() {
  return cookies.get(this.tag).history;
};

rdTracker.prototype._logCookie = function() {
  console.log(cookies.get(this.tag));
};

//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
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

rdTracker.prototype.setUser = function(name, email) {
  const cookie = cookies.get(this.tag);
  cookie.name = name;
  cookie.email = email;
  cookies.set(this.tag, cookie);
};

rdTracker.prototype.addPage = function() {
  const cookie = cookies.get(this.tag);
  cookie.history.push({
    visitedAt: new Date(),
    url: window.location.host + window.location.pathname,
  });

  cookies.set(this.tag, cookie);
};

rdTracker.prototype.sendAndCleanHistory = function() {
  const cookie = cookies.get(this.tag);
  console.log(cookie);
  axios.post(this.server + '/api/visits', cookie).then(res => {
    if ((res.data = 'ok')) {
      cookie.history = [];
      cookies.set(this.tag, cookie);
    }
  });
};

export default rdTracker;
