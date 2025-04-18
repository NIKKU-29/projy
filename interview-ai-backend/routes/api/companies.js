const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const companyController = require('../../controllers/companyController');

// @route   GET api/companies
// @desc    Get all companies
// @access  Public
router.get('/', companyController.getAllCompanies);

// @route   GET api/companies/:id
// @desc    Get company by ID
// @access  Public
router.get('/:id', companyController.getCompanyById);

// @route   GET api/companies/:id/questions
// @desc    Get company questions
// @access  Private
router.get('/:id/questions', auth, companyController.getCompanyQuestions);

// @route   POST api/companies
// @desc    Create a company (admin only)
// @access  Private
router.post('/', auth, companyController.createCompany);

module.exports = router;