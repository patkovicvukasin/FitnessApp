package com.andrea360.fitnessapp.auth;

import com.andrea360.fitnessapp.auth.AuthRequest;
import com.andrea360.fitnessapp.auth.AuthResponse;
import com.andrea360.fitnessapp.exception.auth.UnauthorizedException;
import com.andrea360.fitnessapp.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

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
            String role = authentication.getAuthorities()
                    .iterator().next().getAuthority().replace("ROLE_", "");

            String token = jwtTokenProvider.generateToken(email, role);

            return new AuthResponse(token);
        }catch (AuthenticationException e){
            throw new UnauthorizedException("Invalid email or password");
        }
    }
}
