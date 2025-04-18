const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  questionText: String,
  userResponse: String,
  audioUrl: String,
  evaluation: {
    confidence: {
      type: Number,
      default: 0
    },
    clarity: {
      type: Number,
      default: 0
    },
    relevance: {
      type: Number,
      default: 0
    },
    feedback: String
  },
  duration: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const InterviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  interviewType: {
    type: String,
    enum: ['hr', 'technical', 'mixed'],
    default: 'hr'
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  scheduledDate: {
    type: Date
  },
  responses: [ResponseSchema],
  overallScore: {
    type: Number
  },
  summary: {
    type: String
  },
  strengths: [String],
  improvements: [String],
  duration: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Interview', InterviewSchema);