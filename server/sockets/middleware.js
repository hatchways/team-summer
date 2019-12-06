const { decodeToken } = require('../utils');

exports.verifyToken = async (packet, next) => {
  // Handle no token being passed
  if (packet.length < 3 || !packet[2].hasOwnProperty('token')) return next(new Error('No token is provided'));

  // Verify token and error handling
  try {
    const { token } = packet[2];
    const { payload } = await decodeToken(token);
    if (payload && payload._id) return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') return next(new Error('Token has expired'));

    next(new Error(error))
  }
};