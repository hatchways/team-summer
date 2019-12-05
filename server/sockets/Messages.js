exports.receiveMessage = (io) => (message) => {
  // io.in(room).emit() emits a value to a specific room, in this case the userId
  console.log(`New Message: ${message}`);
  // io.in('Specific user id').emit('newMessage', message);
};