package com.example.audio_transcriber.repository;

import com.example.audio_transcriber.model.AudioFile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AudioFileRepository extends JpaRepository<AudioFile, Long> {
    List<AudioFile> findByUsername(String username);
}
