package br.com.adoteme.config.security;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;

    private final TokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("Começando o filtro...");
        String token = tokenProvider.resolveToken(request);

        if (token != null) {
            try {
                String email = tokenProvider.getEmailFromToken(token);
                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                    if (tokenProvider.validateToken(token, userDetails)) {
                        UsernamePasswordAuthenticationToken auth = tokenProvider.getAuthenticationToken(token, SecurityContextHolder.getContext().getAuthentication(), userDetails);
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        log.info("Authenticated user " + email + ".");
                        SecurityContextHolder.getContext().setAuthentication(auth);
                        filterChain.doFilter(request, response);
                    }
                }
            } catch (IllegalArgumentException e) {
                log.error("Ocorreu um erro ao buscar o email do usuário do token: " + e);
            } catch (ExpiredJwtException e) {
                log.warn("O token: " + e +" expirou");
                String message = "{ " +
                        "\"message\": \"Expired JWT\"\n  " +
                        "} ";
                response.setContentType("application/json");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write(message);
            }
        } else {
            log.warn("Usuário sem login acessando a aplicação!");
            filterChain.doFilter(request, response);
        }
    }
}
