const WebSocket = require('ws');
const http = require('http');

const Socket = function(
  app,
  config = {
    onError: null,
  },
) {
  this.server = http.createServer(app);
  this.wss = new WebSocket.Server({ server: this.server });
  this.config = config;

  // Broadcast to all
  this.wss.broadcast = function broadcast(_msg) {
    const msg = {};
    if (typeof _msg === 'string') {
      msg.action = Socket.a.NOTIFICATION;
      msg.payload = _msg;
      msg.room = '';
    } else {
      if (!Socket.validateMessageObj(_msg)) throw new Error('Invalid action');
      msg.action = _msg.action;
      msg.payload = _msg.payload;
      msg.room = _msg.room;
    }

    this.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        if (!msg.room ) {
          client.send(JSON.stringify(msg));
        } else {
          if (client.room.indexOf(msg.room) > -1) {
            client.send(JSON.stringify(msg));
          }
        }
      }
    });
  };

  this.wss.on('connection', function(ws, req) {
    console.log('== ws connection ==');

    ws.room = [];

    ws.on('error', err => {
      if (config.onError) {
        config.onError(err);
      } else {
        console.log('ws error: ', err);
      }
    });

    ws.on('message', _msg => {
      console.log('ws message: ', _msg);
      const msg = JSON.parse(_msg);

      switch (msg.action){
        case Socket.a.JOIN:
          ws.room.push(msg.payload);
          break;
        case Socket.a.NOTIFICATION:
          if(msg.room) broadcast(msg);
          break;
        case Socket.a.LEAVE:
          ws.room = ws.room.filter( item => item !== msg.payload);
          break;
        default:
      }
    });
  });
};

// Valid Actions
Socket.a = {};
Socket.a.NOTIFICATION = 'notification';
Socket.a.JOIN = 'join';
Socket.a.LEAVE = 'leave';

Socket.validateMessageObj = function(message) {
  const action = Object.keys(Socket.a).find(
    propName => Socket.a[propName] === message.action,
  );
  return !!action;
};

Socket.prototype.middleware = function(config = {}) {
  const self = this;
  return function(req, res, next) {
    res.wss = self.wss;
    next();
  };
};

module.exports = Socket;
