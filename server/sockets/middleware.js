const { decodeToken } = require('../utils');

exports.verifyToken = async (packet, next) => {
  console.log(packet)
  if (packet.length < 3 || !packet[2].hasOwnProperty('token')) {
    return next(new Error('Token invalid'))
  }
  const { token } = packet[2];
  const { payload } = await decodeToken(token);
  if (payload && payload._id) return next()
};