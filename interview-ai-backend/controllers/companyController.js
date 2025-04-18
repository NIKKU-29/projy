const Company = require('../models/Company');
const Question = require('../models/Question');

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ name: 1 });
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    
    res.json(company);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server error');
  }
};

// Get company questions
exports.getCompanyQuestions = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    
    const questions = await Question.find({ company: req.params.id })
                                 .sort({ type: 1, difficulty: 1 });
    
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create company (admin only)
exports.createCompany = async (req, res) => {
  const { name, category, icon, color, description } = req.body;

  try {
    // Check if company already exists
    let company = await Company.findOne({ name });
    if (company) {
      return res.status(400).json({ msg: 'Company already exists' });
    }

    // Create new company
    company = new Company({
      name,
      category,
      icon,
      color,
      description
    });

    await company.save();
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};