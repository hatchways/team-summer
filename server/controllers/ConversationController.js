const { Conversation } = require('../models');
import { mongoDbErrorHandler } from '../utils';

exports.create = async (req, res) => {
  const { users } = req.body;

  try {
    const conversation = await Conversation.create({ users });
    return res.status(200).json(conversation);
  } catch (error) {
    mongoDbErrorHandler(error, res)
  }
};

exports.getConversation = (req, res) => {
  res.status(200).json(req.conversation);
};

exports.deleteConversation = async (req, res) => {
  const { id } = req.params;

  try {
    await Conversation.deleteOne({ _id: id });
    res.status(200).json({ success: true });
  } catch (error) {
    mongoDbErrorHandler(error, res);
  }
};