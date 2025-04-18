const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  color: {
    type: String,
    default: '#4285F4'
  },
  description: {
    type: String
  },
  questionsCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 4.5
  },
  usersCount: {
    type: Number,
    default: 0
  },
  interviewTips: [String],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Company', CompanySchema);