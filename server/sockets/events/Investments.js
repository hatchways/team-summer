exports.receiveInvestment = (io, socket) => ({ id, name, projectName }) => {
    socket.join(id);
    io.to(id).emit('newInvestment', { name, projectName });
};