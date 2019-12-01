'use strict';
const { User } = require('../models');
const { encodeToken, mongoDbErrorHandler } = require('../utils');

exports.register = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      mongoDbErrorHandler(err, res);
    } else {
      const { name, email, _id } = user;
      const token = encodeToken({ name, email, _id });
      return res.status(201).json({
        token,
        user: {
          _id,
          name,
          email
        }
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .populate('projects')
    .exec((err, user) => {
      if (err) {
        mongoDbErrorHandler(err, res, 400);
      } else if (user && user.comparePassword(password)) {
        const { name, email, _id, projects, description, profilePic } = user;
        const token = encodeToken({ name, email, _id, description, profilePic });
        return res.status(200).json({
          token,
          user: {
            _id,
            name,
            email,
            projects
          }
        });
      } else {
        if (!['email', 'password'].every((value) => req.body.hasOwnProperty(value))) {
          return res.status(401).json({ err: 'Email and password need to be in response body' });
        }

        return res.status(400).json({ err: 'Invalid email/password', property: 'email' });
      }
    });
};
