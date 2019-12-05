const messages = require('./Messages');
const authentication = require('./Authentication');
const { verifyToken } = require('./middleware');


module.exports = (io) => {
  // io.use((socket, next) => {
  //   const { token } = socket.handshake.query;
  //
  //   console.log(token);
  //   next();
  // });

  io.on('connection', (socket) => {
    /*
   * At the moment I am using one global socket, for initial implementation
   */
    // Client connection
    console.log('Socket client connected');

    socket.use(verifyToken);

    // Socket event listeners
    socket.on('authenticate join', authentication.connect(socket));

    socket.on('message', messages.receiveMessage(socket));

    // Socket emitters

    // Client disconnect
    socket.on('disconnect', () => console.log('Socket client disconnected'));
  });
};