var express = require('express');
var router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
const projectRoutes = require('./project');
const investmentRoutes = require('./investment');
const notificationRoutes = require('./notification');
const conversationRoutes = require('./conversation');

router.get('/welcome', function (req, res, next) {
  res.status(200).send({ welcomeMessage: 'Step 1 (completed)' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/investments', investmentRoutes);
router.use('/notifications', notificationRoutes);
router.use('/conversations', conversationRoutes);

module.exports = router;
