package com.andrea360.fitnessapp.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final SecretKey key;

    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    public JwtTokenProvider(@Value("${app.jwt.secret}") String secret) {
        byte[] secretBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(secretBytes);
    }

    public String generateToken(String email, String role) {

        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(key)
                .compact();
    }
}
