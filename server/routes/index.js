var express = require('express');
var router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
<<<<<<< HEAD
const { makePayment } = require('./payments');
=======
const projectRoutes = require('./project');
const investmentRoutes = require('./investment');
>>>>>>> dev

router.get('/welcome', function(req, res, next) {
  res.status(200).send({ welcomeMessage: 'Step 1 (completed)' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/investments', investmentRoutes);

module.exports = router;
