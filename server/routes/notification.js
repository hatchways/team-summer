const express = require("express");
const router = express.Router();
const { isAuth } = require('../middlewares');
const notification = require('../controllers/Notification');

router.get('/:userId', isAuth, notification.getNotifications);

module.exports = router;
