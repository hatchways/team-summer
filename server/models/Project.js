const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const ProjectSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  industry: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  images: [
    {
      type: String
    }
  ],
  fundingGoal: {
    type: Number,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  investments: [
    {
      type: ObjectId,
      ref: 'Investment'
    }
  ]
});

ProjectSchema.methods.totalInvestments = async function() {
  try {
    const {investments} = await this.model('Project')
      .findOne({ _id: this._id })
      .populate('investments');
    return investments.reduce((a, b) => a + b.value, 0);
  } catch (err) {
    return 0;
  }
};

module.exports = mongoose.model('Project', ProjectSchema);
