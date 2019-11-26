const { decodeToken } = require('../utils');
const {User} = require('../models');

exports.isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];
    const { payload } = decodeToken(token);
    if (payload && payload._id) {
      User.findById(payload._id)
        .populate('projects')
        .exec((err, user) => {
          if (err || !user) {
            res.status(400).json({
              error: 'User not found'
            });
          } else {
            const { _id, name, email, projects } = user;
            req.profile = { _id, name, email, projects };
            next();
          }
        });
    } else {
      return res.status(403).send({ error: 'Access denied' });
    }
  } else {
    return res.status(403).send({ error: 'Access denied' });
  }
};

//IS THIS NEEDED BY FUTURE ROUTES?
// exports.userById = (req, res, next, id) => {
//   User.findById(id)
//     .populate('projects')
//     .exec((err, user) => {
//       if (err || !user) {
//         return res.status(400).json({
//           error: 'User not found'
//         });
//       }
//       const { _id, name, email, projects } = user;
//       req.profile = { _id, name, email, projects };
//       next();
//     });
// };