package com.example.audio_transcriber.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Transcription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String filename;
    @Lob
    private String transcriptionText;
}
