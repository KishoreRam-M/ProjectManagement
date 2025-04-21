package com.krm.ProjectManagement.Configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

public class JwtTokenValidator extends OncePerRequestFilter {
    final static String KEY = "121ca1410d6f6431f53570e5cc567ddebe953be26e9d5e346af8ebf3b0458f231f6d476a4b6fe23c1921e1752d07940976a58b0681f3c0115d6252692013209e5fffbd8b0fc72c57442f6bffee4d8ebbf2ebb28d15f432d85b02ec0f49ba1d2ea233c448e4d936856be1f9967061989809c74570b7a028a997bc0d35a1c7ef45fd94c7b57249142099cd6e27f45b1b99135ddf2ca5f8a84df09acaa5772fa6e65d26b9c70aa6e961629baebd01f8d71d5f0fb4603fddc6e85a682c60e59706d7e69333cf08ac8c3271e17a6e92cdcb3c54a67bceedefb030dfcc03b362cfda21c0811cd6ceebd1c9f2eff22fab07331b7ec9a1ff79d39979afcbd8084e2ce0613bc1448cdc985092fe7e33d81e63a52ac9abcc3381ac71c807febb5936173a37ff33ddd612b476ace6be2b50d6d02fd50a2a6c112f3840a1b2efe2661934495351a666dc8f37279615947b0a193ecac7aa67f5de6e0dc071ca8bd810da4e22971165db9e78e2e5f5080acdcf53a8282a3b40f7a74eaf535f010df1a0136e43b6abc0921816af691de10e49b74107dd1e284e5a63d30b9f7d1d9416edc09a6b2c144564f9e5cc23342c83b735b6ca5e2809e9b8109add7cba43775e418cb7b728e279f0aafe6f642af7304835231eced9e442ce9a29a6615656bb2ccec4258e2fb8eb4eaddd9173b702e7c9234ce8f0e9f1f82769ad983317b8945c05ac8328d9";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = request.getHeader("Authorization");
            if (jwt != null && jwt.startsWith("Bearer")) {
                jwt = jwt.substring(7);
                SecretKey key = Keys.hmacShaKeyFor(KEY.getBytes());
                Claims claims = Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(jwt).getBody();
                String email = String.valueOf(claims.get("email"));
                String authorithy = String.valueOf(claims.get("Authorities"));
                List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(authorithy);


            }

        } catch (Exception e) {
 throw  new BadCredentialsException("Invalid Token");
        }
filterChain.doFilter(request,response);
    }

}
