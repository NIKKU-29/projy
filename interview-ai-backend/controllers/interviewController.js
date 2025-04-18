const Interview = require('../models/Interview');
const Question = require('../models/Question');
const User = require('../models/User');
const Company = require('../models/Company');
const { evaluateResponse } = require('../services/evaluationService');
const { transcribeSpeech } = require('../services/speechService');

// Start new interview session
exports.startInterview = async (req, res) => {
  try {
    const { companyId, interviewType } = req.body;
    
    // Verify company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    
    // Create new interview session
    const interview = new Interview({
      user: req.user.id,
      company: companyId,
      interviewType,
      status: 'in-progress',
      scheduledDate: new Date(),
      responses: []
    });
    
    await interview.save();
    
    // Get questions for this interview based on type
    const questions = await Question.find({ 
      company: companyId,
      type: interviewType === 'mixed' ? { $in: ['hr', 'behavioral'] } : interviewType
    }).limit(5);
    
    // Update user
    await User.findByIdAndUpdate(req.user.id, {
      $push: { interviewHistory: interview._id }
    });
    
    res.json({ interview, questions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Process speech-to-text and evaluate response
exports.processResponse = async (req, res) => {
  try {
    const { interviewId, questionId, audioBlob } = req.body;
    
    // Get interview session
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ msg: 'Interview session not found' });
    }
    
    // Get question
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }
    
    // Transcribe audio to text
    const transcription = await transcribeSpeech(audioBlob);
    
    // Evaluate the response
    const evaluation = await evaluateResponse(transcription, question);
    
    // Create response object
    const response = {
      question: questionId,
      questionText: question.text,
      userResponse: transcription,
      evaluation,
      duration: req.body.duration || 0
    };
    
    // Add response to interview
    interview.responses.push(response);
    await interview.save();
    
    // Update question stats
    await Question.findByIdAndUpdate(questionId, {
      $inc: { timesAsked: 1 }
    });
    
    res.json({ response, evaluation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Complete interview and generate summary
exports.completeInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    
    // Get interview session
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ msg: 'Interview session not found' });
    }
    
    // Calculate overall score
    const scores = interview.responses.map(r => 
      (r.evaluation.confidence + r.evaluation.clarity + r.evaluation.relevance) / 3
    );
    const overallScore = scores.reduce((acc, score) => acc + score, 0) / scores.length;
    
    // Generate strengths and improvements based on evaluations
    const strengths = [];
    const improvements = [];
    
    interview.responses.forEach(r => {
      if (r.evaluation.confidence > 7) strengths.push('Good confidence');
      if (r.evaluation.clarity > 7) strengths.push('Clear communication');
      if (r.evaluation.relevance > 7) strengths.push('Relevant answers');
      
      if (r.evaluation.confidence < 5) improvements.push('Work on confidence');
      if (r.evaluation.clarity < 5) improvements.push('Improve clarity');
      if (r.evaluation.relevance < 5) improvements.push('Focus on answering the question directly');
    });
    
    // Generate summary
    const summary = `Interview completed with an overall score of ${Math.round(overallScore * 10) / 10}/10. 
                    You answered ${interview.responses.length} questions with varying degrees of success.`;
    
    // Update interview
    interview.status = 'completed';
    interview.overallScore = overallScore;
    interview.summary = summary;
    interview.strengths = [...new Set(strengths)]; // Remove duplicates
    interview.improvements = [...new Set(improvements)]; // Remove duplicates
    interview.duration = req.body.totalDuration || 0;
    
    await interview.save();
    
    // Update user stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { interviewsCompleted: 1 }
    });
    
    res.json(interview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get user's interview history
exports.getUserInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user.id })
                                   .populate('company', 'name icon')
                                   .sort({ createdAt: -1 });
    
    res.json(interviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get interview details by ID
exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
                                  .populate('company')
                                  .populate('responses.question');
    
    if (!interview) {
      return res.status(404).json({ msg: 'Interview not found' });
    }
    
    // Check if user owns this interview
    if (interview.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    res.json(interview);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Interview not found' });
    }
    res.status(500).send('Server error');
  }
};