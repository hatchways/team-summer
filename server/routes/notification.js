const express = require("express");
const router = express.Router();
const { isAuth } = require('../middlewares');
const events = require('../controllers/Event');

router.get('/', isAuth, events.getNotifications);
router.post('/', isAuth, events.createNotification);

module.exports = router;
