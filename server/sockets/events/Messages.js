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

    await Conversation.updateOne({_id: conversation}, {$push: {messages: message._id}});
    io.to(receiver).emit('newMessage', {conversation, sender, content})
  } catch (error) {
    console.log(error);
  }
};