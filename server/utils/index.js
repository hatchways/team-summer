const jwt = require('jsonwebtoken');
const JWTSecret = process.env.JWT_SECRET || 'some secret';

exports.encodeToken = payload => jwt.sign({payload}, JWTSecret, { expiresIn: '30m' });

exports.decodeToken = token => jwt.verify(token, JWTSecret);
