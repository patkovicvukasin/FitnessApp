package com.andrea360.fitnessapp.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthMeResponse {
    private String email;
    private String role;
}