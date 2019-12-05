const { decodeToken } = require('../utils');

exports.connect = (socket) => (id) => socket.join(id);