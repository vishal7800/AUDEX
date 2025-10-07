package com.example.audio_transcriber.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        // placeholder: real admin stats logic goes here
        return Map.of("status", "ok", "message", "admin dashboard");
    }
}
