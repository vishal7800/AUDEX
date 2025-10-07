package com.example.audio_transcriber.controller;

import com.example.audio_transcriber.model.User;
import com.example.audio_transcriber.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173") // allow your frontend
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public Object profile(Authentication authentication) {
        String username = authentication.getName();
        Optional<User> u = userRepository.findByUsername(username);
        if (u.isPresent()) {
            User user = u.get();
            return Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "password", user.getPassword()
            );
        } else {
            return Map.of("message", "User not found");
        }
    }



    @PostMapping("/register")
    public Object register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return Map.of("error", "Username already exists");
        }
        User saved = userRepository.save(user);
        return Map.of(
                "id", saved.getId(),
                "username", saved.getUsername(),
                "email", saved.getEmail()
        );
    }

    @PostMapping("/login")
    public Object login(@RequestBody Map<String, String> loginData) {
        System.out.println("🔥 Login endpoint hit with: " + loginData);

        String email = loginData.get("email");
        String password = loginData.get("password");

        Optional<User> u = userRepository.findByEmail(email);
        System.out.println("👉 Lookup user by email: " + email);

        if (u.isPresent()) {
            User user = u.get();
            System.out.println("✅ User found: " + user.getUsername());

            if (user.getPassword().equals(password)) {
                System.out.println("🔐 Password matched!");
                return Map.of(
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "email", user.getEmail(),
                        "message", "Login successful"
                );
            } else {
                System.out.println("❌ Invalid password");
                return Map.of("error", "Invalid password");
            }
        } else {
            System.out.println("❌ User not found");
            return Map.of("error", "User not found");
        }
    }
}
