const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;
const bcrypt = require('bcrypt');
const saltRounds = 12; // defaults to 10

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  about: {
    type: String,
    maxlength: 600
  },
  location: {
    type: String,
    maxlength: 30
  },
  profilePic: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  projects: [
    {
      type: ObjectId,
      ref: 'Project'
    }
  ],
  investments: [
    {
      type: ObjectId,
      ref: 'Investment'
    }
  ],
  conversations: [
    {
      type: ObjectId,
      ref: 'Conversation'
    }
  ]
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// CASCADE DELETE INVESTMENTS 
// userSchema.pre('remove', function(next) {
//   this.model('Investment').deleteMany({ user: this._id }, next);
// });

UserSchema.methods.comparePassword = function (pw) {
  return bcrypt.compareSync(pw, this.password);
};

module.exports = mongoose.model('User', UserSchema);
