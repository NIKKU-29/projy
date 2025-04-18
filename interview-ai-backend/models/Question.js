const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['technical', 'hr', 'behavioral'],
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  recommendedAnswer: {
    type: String
  },
  keypoints: [String],
  tags: [String],
  timesAsked: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: 'General'
  }
});

module.exports = mongoose.model('Question', QuestionSchema);