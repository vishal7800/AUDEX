package com.example.audio_transcriber.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.*;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/audio")
public class AudioController {

    // ✅ Use safe directories inside user's home
    private static final Path BASE_DIR = Paths.get(System.getProperty("user.home"), "AUDEX", "audio-transcriber");
    private static final Path UPLOAD_DIR = BASE_DIR.resolve("uploads");
    private static final Path TRANSCRIPT_DIR = BASE_DIR.resolve("transcripts");

    @PostMapping("/transcribe")
    public ResponseEntity<?> transcribeAudio(@RequestParam("file") MultipartFile file,
                                             @RequestParam("username") String username) {
        try {
            Files.createDirectories(UPLOAD_DIR);
            Files.createDirectories(TRANSCRIPT_DIR);

            // ✅ Generate unique filename to avoid overwrites
            String originalFilename = file.getOriginalFilename();
            String baseName = originalFilename.substring(0, originalFilename.lastIndexOf('.'));
            String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            String uniqueName = baseName + "_" + UUID.randomUUID() + extension;

            Path filePath = UPLOAD_DIR.resolve(uniqueName);
            file.transferTo(filePath.toFile());

            // ✅ Run Whisper
            ProcessBuilder pb = new ProcessBuilder(
                    "python", "-m", "whisper",
                    filePath.toString(),
                    "--model", "small",
                    "--language", "en",
                    "--output_dir", TRANSCRIPT_DIR.toString()
            );
            pb.redirectErrorStream(true);
            Process process = pb.start();

            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                return ResponseEntity.status(500).body("Whisper process failed with exit code " + exitCode);
            }

            // ✅ Find transcript file
            String transcriptBaseName = uniqueName.substring(0, uniqueName.lastIndexOf('.'));
            Optional<Path> transcriptFile = Files.list(TRANSCRIPT_DIR)
                    .filter(p -> p.getFileName().toString().startsWith(transcriptBaseName) && p.getFileName().toString().endsWith(".txt"))
                    .findFirst();

            if (transcriptFile.isEmpty()) {
                return ResponseEntity.status(500)
                        .body("Transcription file not found in transcripts folder.");
            }

            String transcription = Files.readString(transcriptFile.get());

            return ResponseEntity.ok(Map.of(
                    "filename", uniqueName,
                    "transcription", transcription.trim()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
