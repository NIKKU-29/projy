const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/companies', require('./routes/api/companies'));
app.use('/api/interviews', require('./routes/api/interviews'));
app.use('/api/questions', require('./routes/api/questions'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));// Create a new file: routes/api/tts.js
  const express = require('express');
  const router = express.Router();
  const auth = require('../../middleware/auth');
  const ttsService = require('../../services/ttsService');
  
  // @route   POST api/tts
  // @desc    Convert text to speech
  // @access  Private
  router.post('/', auth, async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ msg: 'Text is required' });
      }
      
      const audioBuffer = await ttsService.generateSpeech(text);
      
      // Send audio as binary response
      res.set({
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.length
      });
      
      res.send(audioBuffer);
    } catch (err) {
      console.error('TTS error:', err);
      res.status(500).json({ msg: 'Text-to-speech conversion failed' });
    }
  });
  
  module.exports = router;

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));