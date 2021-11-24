const ioSocket = require('socket.io')(5000, {
  cors: {
    origin: '*',
    credentials: true
  }
});

ioSocket.on('connection', socket => {
  // Example message read and emit
  socket.on("consumerMessage", data => {
    console.log("consumerMessage", data);
    //ioSocket.emit("consumerMessage", data);
  });
});
