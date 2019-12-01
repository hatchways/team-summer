'use strict';
const { User } = require('../models');
const { encodeToken, decodeToken, mongoDbErrorHandler } = require('../utils');

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
        const { name, email, _id, projects } = user;
        const token = encodeToken({ name, email, _id });
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

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate('projects')
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User not found'
        });
      }
      const { _id, name, email, projects, description, profilePic } = user;
      req.profile = { _id, name, email, projects, description, profilePic };
      next();
    });
};

exports.isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];
    const decodedToken = decodeToken(token);
    req.user = decodedToken.payload;
  } else {
    return res.status(403).send({ error: 'Access denied' });
  }

  let user = req.profile && req.user._id && req.profile._id == req.user._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied'
    });
  }
  next();
};
