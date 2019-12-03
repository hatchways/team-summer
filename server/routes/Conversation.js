const express = require('express');
const router = express.Router();
const { isAuth, conversationById } = require('../middlewares');
const conversationController = require('../controllers/ConversationController');
const messageRoutes = require('./Message');

router.get('/:id', isAuth, conversationController.getConversation);
router.delete('/:id/delete', isAuth, conversationController.deleteConversation);
router.use('/:id/messages', isAuth, messageRoutes);
router.post('/create', conversationController.create);


router.param('id', conversationById);

module.exports = router;