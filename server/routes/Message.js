const express = require("express");
const router = express.Router();
const { isAuth, userById } = require('../middlewares');
const messageController = require('../controllers/MessagesController');

router.get('/', messageController.createMessage);

module.exports = router;