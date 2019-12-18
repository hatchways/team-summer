const { Conversation, Message, User } = require('../models');
const mongoose = require('mongoose');
const { mongoDbErrorHandler } = require('../utils');

exports.create = async (req, res) => {
  const { users } = req.body;

  if (users.length < 2) return res.status(400).json({ error: 'You must provided 2 users' });

  try {
    // If the conversation exists, just return it
    const existingConversation = await Conversation.findOne({ users });
    if (existingConversation) return res.status(200).json(existingConversation);

    const conversation = await Conversation.create({ users });
    await User.updateMany({ _id: { $in: users } }, { conversations: conversation._id });
    return res.status(200).json(conversation);
  } catch (error) {
    mongoDbErrorHandler(error, res);
  }
};

exports.getConversation = (req, res) => res.status(200).json(req.conversation);

exports.getConversationsForUser = async (req, res) => {
  const { user: userId } = req.query;

  try {
    await Conversation.find({ users: mongoose.Types.ObjectId(userId) })
      .populate({
        path: 'users',
        match: { _id: { $ne: userId } },
        select: ['name', 'profilePic', 'location']
      })
      .populate({
        path: 'messages',
        select: ['content', 'sender']
      })
      .exec((err, user) => {
        if (err) return res.status(400).json({ error: err });

        res.status(200).json(user);
      });
  } catch (error) {
    mongoDbErrorHandler(error, res);
  }
};

exports.deleteConversation = async (req, res) => {
  const { id } = req.conversation;

  try {
    await Conversation.deleteOne({ _id: id });
    await Message.deleteMany({ conversation: id });
    await User.updateMany({ conversations: id }, { $pull: { conversations: id } });
    res.status(200).json({ success: true });
  } catch (error) {
    mongoDbErrorHandler(error, res);
  }
};