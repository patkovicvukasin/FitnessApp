package com.andrea360.fitnessapp.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public AuthMeResponse me(Authentication auth) {
        return authService.getCurrentUser(auth);
    }
}
