exports.receiveInvestment = (io, socket) => ({ id, name, projectName }) => {
    socket.join(id);
    console.log('name', name, projectName)
    socket.to(id).emit('newInvestment', { name, projectName });
};