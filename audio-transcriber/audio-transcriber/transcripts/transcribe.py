import sys
import whisper
import os

audio_path = sys.argv[1]

# Load Whisper model (small is fast enough)
model = whisper.load_model("small")

result = model.transcribe(audio_path)

# Save transcript
os.makedirs("transcripts", exist_ok=True)
filename = os.path.basename(audio_path) + ".txt"
with open(os.path.join("transcripts", filename), "w", encoding="utf-8") as f:
    f.write(result["text"])

print(result["text"])  # This is what backend reads