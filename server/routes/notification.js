const express = require("express");
const router = express.Router();
const { isAuth } = require('../middlewares');
const notification = require('../controllers/Notification');

router.get('/', isAuth, notification.getNotifications);
router.post('/', isAuth, notification.createNotification);

module.exports = router;
