const messages = require('./events/Messages');
const middleware = require('./middleware');


module.exports = (io) => {
  io.on('connection', (socket) => {
    /*
    * Global socket handler
    * */

    // Client connection
    console.log('Socket client connected');

    // Middleware for each socket event listener
    socket.use(middleware.verifyToken);

    // Socket event listeners
    /*
    * https://socket.io/docs/emit-cheatsheet/
    * You can send a response inside a listener by one of the following:
    *
    * Socket: Emits value to all the clients in the room (by default all clients) EXCEPT for the sender
    *   (to a different room then default use .to(room).emit())
    * * socket.emit('event', value)
    *
    * io: Emits the message to all the clients connected (or .to(room)) (including person who triggered it)
    * * io.emit('event', value)
    * */

    /* Connects userId to a room, allows for the ability to send to a user id */
    socket.on('authenticate', (id) => socket.join(id));

    socket.on('sendMessage', messages.receiveMessage(io));

    // Socket emitters

    // Client disconnect
    socket.on('disconnect', () => console.log('Socket client disconnected'));
  });
};