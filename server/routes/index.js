var express = require('express');
var router = express.Router();
const authRoutes = require('./auth');
const projectRoutes = require('./project');
const userRoutes = require('./users');

router.get('/welcome', function(req, res, next) {
  res.status(200).send({ welcomeMessage: 'Step 1 (completed)' });
});

router.use('/api', authRoutes);
router.use('/api', projectRoutes);
router.use('/api', userRoutes);

// EG usage of verifyJwt middleware for protected routes
// Works with header format:  authorization: {bearer} {token}

// router.get("/route", verifyJwt, function (req, res) {
//   const { name } = req.user;
//   res.status(200).send({ message: `welcome ${name}` });
// });

module.exports = router;
