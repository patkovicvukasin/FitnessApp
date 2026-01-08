package com.andrea360.fitnessapp.auth;

import com.andrea360.fitnessapp.exception.auth.UnauthorizedException;
import com.andrea360.fitnessapp.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponse login(AuthRequest request) {
        try {
            UsernamePasswordAuthenticationToken authInput =
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    );

            Authentication authentication = authenticationManager.authenticate(authInput);

            String email = authentication.getName();
            String role = getPrimaryRole(authentication);
            String token = jwtTokenProvider.generateToken(email, role);

            return new AuthResponse(token);
        }catch (AuthenticationException e){
            throw new UnauthorizedException("Invalid email or password");
        }
    }

    public AuthMeResponse getCurrentUser(Authentication auth) {
        return new AuthMeResponse(
            auth.getName(),
            getPrimaryRole(auth)
        );
    }

    private String getPrimaryRole(Authentication auth) {
        if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN")))
            return "ADMIN";
        if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE")))
            return "EMPLOYEE";
        if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_MEMBER")))
            return "MEMBER";
        return "UNKNOWN";
    }
}
