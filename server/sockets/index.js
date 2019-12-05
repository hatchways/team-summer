const messages = require('./Messages');
const authentication = require('./Authentication');
const middleware = require('./middleware');


module.exports = (io) => {
  io.on('connection', (socket) => {
    /*
    * Global socket handler, basically the root handler for sockets.
    * */

    // Client connection
    console.log('Socket client connected');

    // Middleware for each socket event listener
    socket.use(middleware.verifyToken);

    // Socket event listeners
    // socket.on('authenticate join', authentication.connect(socket));

    socket.on('message', messages.receiveMessage(socket));

    // Socket emitters

    // Client disconnect
    socket.on('disconnect', () => console.log('Socket client disconnected'));
  });
};