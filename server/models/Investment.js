const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema; 

const InvestmentSchema = new Schema({
    value: {
        type: Number,
        required: true,
        trim: true,
        min: 5
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    project: {
        type: ObjectId,
        ref: 'Project'
    }
});

module.exports = mongoose.model('Investment', InvestmentSchema);

