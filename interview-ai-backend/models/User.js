const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  interviewsCompleted: {
    type: Number,
    default: 0
  },
  interviewHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview'
    }
  ],
  subscription: {
    type: String,
    enum: ['free', 'premium', 'enterprise'],
    default: 'free'
  }
});

module.exports = mongoose.model('User', UserSchema);