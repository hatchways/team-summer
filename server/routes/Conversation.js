const express = require('express');
const router = express.Router();
const { isAuth, conversationById } = require('../middlewares');
const conversationController = require('../controllers/ConversationController');
const messageRoutes = require('./Message');

router.get('/', isAuth, conversationController.getConversationsForUser);
router.get('/:id', isAuth, conversationController.getConversation);
router.delete('/:id', isAuth, conversationController.deleteConversation);
router.post('/create', conversationController.create);


router.param('id', conversationById);

module.exports = router;