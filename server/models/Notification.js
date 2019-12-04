const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const NotificationSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    events: {
        messages: [{
            type: ObjectId,
            ref: 'Message'
        }],
        investments: [{
            type: ObjectId,
            ref: 'Message'
        }],
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);