const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const MessageSchema = new Schema({
  conversation: {
    type: ObjectId,
    ref: 'Conversation'
  },
  sender: {
    type: ObjectId,
    ref: 'User'
  },
  receiver: {
    type: ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    maxLength: 1000,
    required: true
  }
});

module.exports = mongoose.model('Message', MessageSchema);