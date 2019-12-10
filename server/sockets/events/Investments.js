exports.receiveInvestment = (io, socket) => ({ id, name, projectName }) => {
  socket.join(id);
  console.log(`${name} invested in your project, ${projectName}!`);
  io.to(id).emit('newInvestment', { name, projectName });
};