const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/default');

// Transcribe speech using Faster Whisper
exports.transcribeSpeech = async (audioBlob) => {
  try {
    // Save audio blob to temp file
    const tempDir = os.tmpdir();
    const audioFilePath = path.join(tempDir, `${uuidv4()}.wav`);
    fs.writeFileSync(audioFilePath, audioBlob);

    // Create process to run faster-whisper
    const transcription = await runFasterWhisper(audioFilePath);
    
    // Clean up temp file
    fs.unlinkSync(audioFilePath);
    
    return transcription;
  } catch (error) {
    console.error('Speech-to-text error:', error);
    return "Speech transcription failed. Please try again.";
  }
};

// Run faster-whisper using Python subprocess
async function runFasterWhisper(audioFilePath) {
  return new Promise((resolve, reject) => {
    // Path to Python script that uses faster-whisper
    const scriptPath = path.join(__dirname, '../scripts/transcribe.py');
    
    // Spawn Python process
    const python = spawn('python', [
      scriptPath,
      audioFilePath,
      config.fasterWhisperModel
    ]);
    
    let transcription = '';
    let errorOutput = '';
    
    // Collect output
    python.stdout.on('data', (data) => {
      transcription += data.toString();
    });
    
    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    // Handle process completion
    python.on('close', (code) => {
      if (code !== 0) {
        console.error('Faster Whisper Error:', errorOutput);
        reject(new Error(`Faster Whisper process exited with code ${code}`));
      } else {
        resolve(transcription.trim());
      }
    });
  });
}

// Real-time streaming transcription via WebSocket
exports.streamTranscribeSpeech = (socket) => {
  socket.on('speech-data', async (data) => {
    try {
      // Save audio chunk to temp file
      const tempDir = os.tmpdir();
      const chunkFilePath = path.join(tempDir, `${uuidv4()}_chunk.wav`);
      fs.writeFileSync(chunkFilePath, data.audio);
      
      // Process audio chunk with faster-whisper
      const partialTranscription = await runFasterWhisper(chunkFilePath);
      
      // Clean up temp file
      fs.unlinkSync(chunkFilePath);
      
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