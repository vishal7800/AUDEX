package com.example.audio_transcriber.controller;

import com.example.audio_transcriber.model.User;
import com.example.audio_transcriber.repository.UserRepository;
import com.example.audio_transcriber.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class AuthControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @Test
    public void testSignupSuccess() {
        User user = new User();
        user.setUsername("Admin");
        user.setEmail("Admin@audex.com");
        user.setPassword("Password@123");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        ResponseEntity<?> response = authController.signup(user);
        Map<String, String> body = (Map<String, String>) response.getBody();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User registered successfully", body.get("message"));
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testSignupEmailAlreadyRegistered() {
        User user = new User();
        user.setUsername("TestUser");
        user.setEmail("test@example.com");
        user.setPassword("Password@123");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        ResponseEntity<?> response = authController.signup(user);
        Map<String, String> body = (Map<String, String>) response.getBody();

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Email already registered", body.get("error"));
    }

    @Test
    public void testLoginSuccess() {
        User user = new User();
        user.setUsername("Admin");
        user.setEmail("admin@audex.com");
        user.setPassword("encodedPassword");
        // Role removed

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
        when(jwtUtil.generateToken(anyString(), anyString())).thenReturn("dummyToken");

        ResponseEntity<?> response = authController.login(Map.of(
                "email", "admin@audex.com",
                "password", "Password@123"
        ));

        Map<String, String> body = (Map<String, String>) response.getBody();
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Admin", body.get("username"));
        assertEquals("dummyToken", body.get("token"));
    }
}
