package com.example.audio_transcriber.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Scanner;

@Service
public class AudioService {

    private static final String TRANSCRIPT_DIR = "transcripts";

    public String processAudio(File audioFile) throws Exception {
        Files.createDirectories(Path.of(TRANSCRIPT_DIR));

        String transcriptFileName = audioFile.getName() + ".txt";
        Path transcriptPath = Path.of(TRANSCRIPT_DIR, transcriptFileName);

        // Delete old transcript if exists
        Files.deleteIfExists(transcriptPath);

        // Absolute paths
        String audioAbsolute = audioFile.getAbsolutePath();
        String transcriptAbsolute = transcriptPath.toAbsolutePath().toString();

        // Run whisper Python script (you must have whisper installed in your Python env)
        ProcessBuilder pb = new ProcessBuilder(
                "python",
                "transcripts/transcribe.py",
                audioAbsolute,
                transcriptAbsolute // pass output path to script
        );
        pb.redirectErrorStream(true);
        Process process = pb.start();

        // Print logs (optional)
        try (InputStream is = process.getInputStream(); Scanner sc = new Scanner(is)) {
            while (sc.hasNextLine()) {
                System.out.println(sc.nextLine());
            }
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("Whisper process failed");
        }

        // Wait for file to be written
        Thread.sleep(500);

        if (!Files.exists(transcriptPath)) {
            throw new RuntimeException("Transcription file not found: " + transcriptAbsolute);
        }

        return Files.readString(transcriptPath).trim();
    }
}