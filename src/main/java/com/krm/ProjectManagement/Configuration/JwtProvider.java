package com.krm.ProjectManagement.Configuration;

import com.krm.ProjectManagement.Repo.UserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtProvider {
    @Autowired
    private static UserRepo userRepo;

    private static final String KEY = "121ca1410d6f6431f53570e5cc567ddebe953be26e9d5e346af8ebf3b0458f23";
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(KEY.getBytes());

    public static String generateToken(Authentication authentication) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", authentication.getName());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(authentication.getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SECRET_KEY)
                .compact();
    }

    public static String getEmailFromToken(String jwt) {


        Claims claims = Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(jwt).getBody();
        String email = String.valueOf(claims.get("email"));
        userRepo.findByEmail(email);
        return String.valueOf(email);
    }
}
