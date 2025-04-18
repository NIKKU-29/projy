const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Question = require('../../models/Question');
const { check, validationResult } = require('express-validator');

// @route   GET api/questions
// @desc    Get all questions
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const questions = await Question.find().populate('company', 'name');
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/questions/:id
// @desc    Get question by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('company', 'name');
    
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }
    
    res.json(question);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/questions
// @desc    Create a question
// @access  Private (admin)
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Question text is required').not().isEmpty(),
      check('type', 'Question type is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { text, type, company, difficulty, recommendedAnswer, keypoints, tags, category } = req.body;

      const newQuestion = new Question({
        text,
        type,
        company,
        difficulty: difficulty || 'medium',
        recommendedAnswer,
        keypoints: keypoints || [],
        tags: tags || [],
        category: category || 'General'
      });

      const question = await newQuestion.save();
      res.json(question);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/questions/:id
// @desc    Delete a question
// @access  Private (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    await question.remove();
    res.json({ msg: 'Question removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;