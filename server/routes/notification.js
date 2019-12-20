const express = require("express");
const router = express.Router();
const { isAuth } = require('../middlewares');
const notification = require('../controllers/notificationController.api');

router.get('/:userId', isAuth, notification.getNotifications);
router.put('/:notificationId', notification.setNotificationToSeen);
router.delete('/:notificationId', isAuth, notification.deleteNotification);

module.exports = router;
