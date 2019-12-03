const {Conversation, Message} = require('../models');


exports.createMessage = (req, res) => {
  res.status(200).json({
    success: true
  })
};