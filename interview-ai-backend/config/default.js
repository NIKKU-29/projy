module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/interview-ai',
    jwtSecret: process.env.JWT_SECRET || 'interview-ai-secret-token',
    mistralApiKey: process.env.MISTRAL_API_KEY || 'your-mistral-api-key',
    fasterWhisperModel: process.env.FASTER_WHISPER_MODEL || 'base',  // base, small, medium, large
    coquiTTSModel: process.env.COQUI_TTS_MODEL || 'tts_models/en/ljspeech/tacotron2-DDC'
  };