const jwt = require('jsonwebtoken');
const JWTSecret = process.env.JWT_SECRET || 'some secret';

exports.encodeToken = (payload) => jwt.sign({ payload }, JWTSecret, { expiresIn: '30m' });

exports.decodeToken = (token) => jwt.verify(token, JWTSecret);

exports.mongoDbErrorHandler = (err, res, defaultErrorCode = 400) => {
  // Preset error to handle unknown errors
  let error = err;
  let code = defaultErrorCode;

  // MongoDb code 11000 Duplicate key - Assuming unique key
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    error = {
      err: `${key} already registered.`,
      property: key
    };

    code = 409;
  }

  return res.status(code).json(error);
};
