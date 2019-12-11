const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;
const Notification = require('./Notification');
const Project = require('./Project');

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
        required: true,
        ref: 'User'
    },
    project: {
        type: ObjectId,
        required: true,
        ref: 'Project'
    }
});

InvestmentSchema.post('save', async function (doc, next) {
    try {
        const notification = {
            investor: doc.user,
            investmentAmount: doc.value,
            project: doc.project
        }

        await Project.findById(doc.project, 'user', function (err, project) {
            if (err) return err;
            notification.user = project.user;
        })

        await Notification.create(notification, (err, notification) => {
            if (err) {
                return err
            } else {
                return notification
            }
        })
    } catch (err) {
        return err
    }
    next();
});

module.exports = mongoose.model('Investment', InvestmentSchema);

