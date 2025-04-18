module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/interview-ai',
    jwtSecret: process.env.JWT_SECRET || 'interview-ai-secret-token',
    openAIKey: process.env.OPENAI_API_KEY || 'your-openai-api-key',
    googleSpeechApiKey: process.env.GOOGLE_SPEECH_API_KEY || 'your-google-speech-api-key'
  };