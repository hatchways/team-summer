const { decodeToken } = require('../utils');
const { User, Project } = require('../models');

exports.isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];
    const { payload } = await decodeToken(token);
    if (payload && payload._id) {
      req.user = payload;
      next();
    }
  } else {
    return res.status(403).send({ error: 'Access denied' });
  }
};

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate('projects')
    .populate('investments')
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User not found'
        });
      }
      const { _id, name, email, about, location, projects, profilePic, investments } = user;
      req.profile = { _id, name, about, email, projects, location, profilePic, investments };
      next();
    });
};

