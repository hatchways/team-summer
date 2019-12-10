const { decodeToken } = require('../utils');
const { User, Project, Conversation } = require('../models');


exports.isDev = (req, res, next) => {
  if (process.env.ENVIRONMENT === 'development') return next();

  res.status(401).json({error: `Cannot process request on ENVIRONMENT: ${process.env.ENVIRONMENT}`})
};

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

exports.conversationById = (req, res, next, id) => {
  Conversation.findById(id)
    .populate('coversations')
    .exec((err, conversion) => {
      if (err && err.name === 'CastError') return res.status(400).json({ error: 'Id is invalid type' });
      if (err) return res.status(400).json({ error: err });

      if (!conversion) return res.status(400).json({error: 'Conversation does not exist'})
      req.conversation = conversion;
      next();
    });
};

