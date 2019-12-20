const express = require('express');
const router = express.Router();
const { isAuth, isDev, conversationById } = require('../middlewares');
const conversationController = require('../controllers/conversationController.api');

router.get('/', isAuth, conversationController.getConversationsForUser);
router.get('/:id', conversationController.getConversation);
router.delete('/:id', isDev, conversationController.deleteConversation);
router.post('/create', conversationController.create);


router.param('id', conversationById);

module.exports = router;