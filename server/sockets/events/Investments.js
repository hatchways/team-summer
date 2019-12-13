exports.receiveInvestment = (io, socket) => ({ id, name, projectName }) => {
    socket.join(id);
    socket.to(id).emit('newInvestment', { name, projectName });
};