#!/usr/bin/env python3
import sys
import os
from TTS.utils.manage import ModelManager
from TTS.utils.synthesizer import Synthesizer

def synthesize_text(text, output_path, model_name):
    # Initialize model manager
    model_manager = ModelManager()
    
    # Get model path
    model_path, config_path, _ = model_manager.download_model(model_name)
    
    # Initialize synthesizer
    synthesizer = Synthesizer(
        model_path=model_path,
        config_path=config_path,
        use_cuda=False  # Set to True if GPU is available
    )
    
    # Generate speech
    waves = synthesizer.tts(text)
    
    # Save to file
    synthesizer.save_wav(waves, output_path)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python synthesize.py <text> <output_file> <model_name>")
        sys.exit(1)
    
    text = sys.argv[1]
    output_path = sys.argv[2]
    model_name = sys.argv[3]
    
    synthesize_text(text, output_path, model_name)