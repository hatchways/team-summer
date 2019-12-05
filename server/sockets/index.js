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
    /* Connects userId to a room, allows for the ability to send to a user id */
    socket.on('authenticate', authentication.connect(socket));

    socket.on('message', messages.receiveMessage(io));

    // Socket emitters

    // Client disconnect
    socket.on('disconnect', () => console.log('Socket client disconnected'));
  });
};