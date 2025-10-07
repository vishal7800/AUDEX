package com.example.audio_transcriber.repository;

import com.example.audio_transcriber.model.Transcription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TranscriptionRepository extends JpaRepository<Transcription, Long> {}
