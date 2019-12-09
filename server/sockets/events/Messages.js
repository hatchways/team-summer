const { Conversation, Message } = require('../../models');

exports.receiveMessage = (io) => async ({ sender, receiver, conversation, content }) => {
  console.log(`New Message: ${content}`);

  try {
    const message = await Message.create({
      sender,
      receiver,
      conversation,
      content
    });

    await Conversation.updateOne({_id: conversation}, {messages: message._id})
  } catch (error) {
    console.log(error);
  }
  // io.to(id).emit('newMessage', message);
};