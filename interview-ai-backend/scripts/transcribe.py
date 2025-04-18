#!/usr/bin/env python3
import sys
import os
from faster_whisper import WhisperModel

def transcribe_audio(audio_path, model_size):
    # Run on CPU with FP16
    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    
    # Transcribe audio
    segments, info = model.transcribe(audio_path, beam_size=5)
    
    # Collect transcription
    transcription = ""
    for segment in segments:
        transcription += segment.text + " "
    
    return transcription.strip()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python transcribe.py <audio_file> <model_size>")
        sys.exit(1)
    
    audio_path = sys.argv[1]
    model_size = sys.argv[2]  # "base", "small", "medium", "large"
    
    transcription = transcribe_audio(audio_path, model_size)
    print(transcription)