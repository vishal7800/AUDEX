package com.example.audio_transcriber.service;

import org.springframework.stereotype.Service;
import java.io.File;

@Service
public class TranscriptionService {

    public String transcribe(File audioFile) {
        // Dummy transcription for now (to test end-to-end flow)
        return "This is a sample transcription for file: " + audioFile.getName();
    }
}