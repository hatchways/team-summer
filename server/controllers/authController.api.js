'use strict';
const { User } = require('../models');
const { encodeToken } = require('../utils');

exports.register = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      let error = err;
      let code = 400;

      if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        error = {
          err: `${key} already registered.`,
          property: key
        };
        // Throw HTTP error 200 OK as request was fine, but error was with key taken
        // handle errors client side
        code = 409;
      }

      res.status(code).json(error);
    } else {
      const { name, email } = user;
      const token = encodeToken({ name, email });
      return res.status(201).json({ token });
    }
  });
};

exports.login = (req, res) => {
  const { name, password } = req.body;
  User.findOne(
    {
      name
    },
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'an error occurred' });
      } else if (user && user.comparePassword(password)) {
        const { name, email } = user;
        const token = encodeToken({ name, email });
        return res.json({
          status: 200,
          token
        });
      } else {
        return res.json({
          status: 401,
          message: 'invalid name/password'
        });
      }
    }
  );
};
