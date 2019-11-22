'use strict';
const { User } = require('../models');
const { encodeToken, mongoDbErrorHandler } = require('../utils');

exports.register = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      mongoDbErrorHandler(err, res);
    } else {
      const { name, email } = user;
      const token = encodeToken({ name, email });
      return res.status(201).json({ token });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      // Unknown/MongoDB error
      mongoDbErrorHandler(err, res, 500);
    } else if (user && user.comparePassword(password)) {
      // Login OK
      const { name, email } = user;
      const token = encodeToken({ name, email });

      return res.status(200).json({ token });
    } else {
      // If an api request forgets a req.body property
      if (!['email', 'password'].every((value) => req.body.hasOwnProperty(value))) {
        return res.status(500).json({ err: 'Email and password need to be in response body' });
      }

      // Invalid login
      return res.status(401).json({ message: 'Invalid email/password' });
    }
  });
};
