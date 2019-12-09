const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const EventSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    investmentAmount: {
        type: Number,
        required: true,
    },
    investor: {
        type: ObjectId,
        ref: 'User'
    },
    project: {
        type: ObjectId,
        ref: 'Project',
        required: true,
    },
    seen: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', EventSchema);