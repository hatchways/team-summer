const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema; //what is this doing?

const InvestmentSchema = new Schema({
    value: {
        type: Number,
        required: true,
        trim: true, // necessary?
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

//class method for finding total investment for a project?

module.exports = mongoose.model('Investment', InvestmentSchema);

// Investment Model
// back a project with a certain amount of money
// a project will have many fundraisers / backers
// Get an individual project (with the user + the number of backends, and the amount already fundraised)



// User has many projects
// User has many investments - investment belongs to a user
// project has many investments - investment belongs to a project


