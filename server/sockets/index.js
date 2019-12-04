const messages = require('./Messages');

module.exports = (socket) => {
  /*
   * At the moment I am using one global socket, for initial implementation
   */
  // Client connection
  console.log('Socket client connected');

  // Socket event listeners
  socket.on('message', messages.receiveMessage(socket));

  // socket emitters

  // Client disconnect
  socket.on('disconnect', () => console.log('Socket client disconnected'));
};