exports.receiveMessage = (io) => ({id, message}) => {
  console.log(`New Message: ${message}`);
  io.to(id).emit('newMessage', message);
};