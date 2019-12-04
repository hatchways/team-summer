exports.receiveMessage = (socket) => (message) => {
  console.log(`New Message: ${message}`);
  socket.emit('newMessage', message);
};