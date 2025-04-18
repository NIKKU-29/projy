const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const interviewController = require('../../controllers/interviewController');

// @route   POST api/interviews/start
// @desc    Start new interview session
// @access  Private
router.post('/start', auth, interviewController.startInterview);

// @route   POST api/interviews/process
// @desc    Process speech response
// @access  Private
router.post('/process', auth, interviewController.processResponse);

// @route   PUT api/interviews/:id/complete
// @desc    Complete interview and generate summary
// @access  Private
router.put('/:id/complete', auth, interviewController.completeInterview);

// @route   GET api/interviews
// @desc    Get user's interview history
// @access  Private
router.get('/', auth, interviewController.getUserInterviews);

// @route   GET api/interviews/:id
// @desc    Get interview details by ID
// @access  Private
router.get('/:id', auth, interviewController.getInterviewById);

module.exports = router;