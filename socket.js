module.exports = io => {

  io.on('connection', function(socket) {
    console.log('websocket connection');

    socket.on('join', function(room){
      socket.join(room);
    });

    socket.on('leave', function(room){
      socket.leave(room);
    });
  })
};

