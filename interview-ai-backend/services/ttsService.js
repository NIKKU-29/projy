const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/default');

// Generate speech from text using Coqui TTS
exports.generateSpeech = async (text) => {
  try {
    // Create a unique filename for the output audio
    const tempDir = os.tmpdir();
    const outputFilePath = path.join(tempDir, `${uuidv4()}.wav`);
    
    // Run Coqui TTS to generate speech
    await runCoquiTTS(text, outputFilePath);
    
    // Read the generated audio file
    const audioBuffer = fs.readFileSync(outputFilePath);
    
    // Clean up temp file
    fs.unlinkSync(outputFilePath);
    
    return audioBuffer;
  } catch (error) {
    console.error('TTS error:', error);
    throw new Error('Failed to generate speech from text');
  }
};

// Run Coqui TTS using Python subprocess
async function runCoquiTTS(text, outputFilePath) {
  return new Promise((resolve, reject) => {
    // Path to Python script that uses Coqui TTS
    const scriptPath = path.join(__dirname, '../scripts/synthesize.py');
    
    // Spawn Python process
    const python = spawn('python', [
      scriptPath,
      text,
      outputFilePath,
      config.coquiTTSModel
    ]);
    
    let errorOutput = '';
    
    // Collect error output
    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    // Handle process completion
    python.on('close', (code) => {
      if (code !== 0) {
        console.error('Coqui TTS Error:', errorOutput);
        reject(new Error(`Coqui TTS process exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}