exports.receiveInvestment = (io) => ({ id, name, projectName }) => {
  console.log(`${name} invested in your project, ${projectName}!`);
  const newInvestmentNotification = `${name} invested in your project, ${projectName}!`;
  io.to(id).emit('newInvestment', newInvestmentNotification);
};