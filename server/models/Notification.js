const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const NotificationSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    eventCount: {
        type: Number,
        default: 0
    },
    notifications: [{
        type: ObjectId,
        ref: 'Notification'
    }],
    messages: [{
        type: ObjectId,
        ref: 'Message'
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);