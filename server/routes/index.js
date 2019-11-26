var express = require('express');
var router = express.Router();
const authRoutes = require('./auth');
const projectRoutes = require('./project');
const investmentRoutes = require('./investment');

router.get('/welcome', function (req, res, next) {
  res.status(200).send({ welcomeMessage: 'Step 1 (completed)' });
});

router.use('/users', authRoutes);
router.use('/projects', projectRoutes);
router.use('/investments', investmentRoutes);

module.exports = router;
