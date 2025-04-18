const axios = require('axios');
const config = require('../config/default');

// ---------- Static Audio Transcription (Google Speech-to-Text API) ----------
exports.transcribeSpeech = async (audioBlob) => {
  try {
    const audioBase64 = Buffer.from(audioBlob).toString('base64');

    const response = await axios.post(
      `https://speech.googleapis.com/v1/speech:recognize?key=${config.googleSpeechApiKey}`,
      {
        config: {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
          enableAutomaticPunctuation: true,
          model: 'command_and_search'
        },
        audio: {
          content: audioBase64
        }
      }
    );

    const transcription = response.data.results
      ? response.data.results.map(result => result.alternatives[0].transcript).join(' ')
      : '';

    return transcription;

  } catch (error) {
    console.error('Speech-to-text error:', error);
    return "This is a fallback transcription as the speech-to-text service encountered an error.";
  }
};

// ---------- Real-Time Streaming Transcription via WebSocket ----------
exports.streamTranscribeSpeech = (socket) => {
  socket.on('speech-data', async (data) => {
    try {
      const partialTranscription = await processAudioChunk(data.audio);

      socket.emit('partial-transcription', {
        text: partialTranscription,
        timestamp: Date.now()
      });

    } catch (err) {
      console.error('Real-time speech transcription error:', err);
      socket.emit('transcription-error', {
        message: 'An error occurred while processing audio stream.'
      });
    }
  });

  socket.on('end-stream', () => {
    console.log('Speech stream ended by client.');
  });
};

// ---------- Placeholder for Real-Time Audio Processing ----------
async function processAudioChunk(audioBuffer) {
  // Replace with real streaming transcription service here
  return "Mock transcription of current chunk.";
}
