package com.krm.ProjectManagement.Configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

@Component
public class JwtTokenValidator extends OncePerRequestFilter {

    private static final String KEY = "e3810e11c7eb92315952a860530856bcc146b64904334870a4429991de46e29bf674550b74a0fb5ba11743a49afe73ec405e319e1e0211024dcbd226bfa322d9d311fbca50c74ce98837ba93055a83f36ce663a78af02892da6d25654111eaa070861f55032f070ddc96a155477da598de6dfdcf5944884dfb8bd5ce055a4e9584c1d4f8ccfb571753fa5adefe4e89c98f8563e79a6ff06d7d43869eb8613310f4e0f7670bc8d8fa6e75bf87cc48fc2f03e951904458c99299c4d0f4106fcca469023fefff656e0e07da25cb0d9ce8f3ef3d32f5cc659e30b2a57c5b85185c5ae0d64ddf80097ad4ea50786295653163ef2e019659e047756e515a0241a7a8fd82fb44c28272401a5ed40e8246261a0b33ec36a2b51a51b020d183529e847535ab61f0bd39a94047f6f01caab4b28b1b66941e19af6b4c5c27931d38448c14a89003d141ee4ae5e63c9f2c96e3904c6ec370633718bb51ab09470255c9d5065fa778713dcf8f0b0afc1e376bfeadb3208108aa5a3cd5aa2340656613bf542059b7d9d1b0a9a13decb508765193a891a7097db64fa323d5101a93722010fb7e820d032bdda4643ab968f24f2e7c6caec81f37fd5d8cb46769277baf18d91ded2ba2cfdfe8daa05a9d27d8b1c5c3a5360aabb18b8e77b174e5a3ff8dc963942bb3445ed354581dcaf5d58ef372c911b1abbbbd683ad94db0a9cf43f8996b4308bd";
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(KEY.getBytes());

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            String email = String.valueOf(claims.get("email"));

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(email, null, List.of());

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }
}
