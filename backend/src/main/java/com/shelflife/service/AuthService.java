package com.shelflife.service;

import com.shelflife.dto.auth.AuthResponse;
import com.shelflife.dto.auth.GoogleLoginRequest;
import com.shelflife.dto.auth.LoginRequest;
import com.shelflife.dto.auth.RegisterRequest;
import com.shelflife.exception.BadRequestException;
import com.shelflife.entity.User;
import com.shelflife.exception.ConflictException;
import com.shelflife.mapper.UserMapper;
import com.shelflife.repository.UserRepository;
import com.shelflife.security.JwtService;
import com.shelflife.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMapper userMapper;
    private final RestClient restClient;

    @Value("${app.google.oauth-client-id:}")
    private String googleOAuthClientId;

    public AuthResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new ConflictException("Email is already registered");
        }
        String phone = normalizePhone(request.phone());
        if (phone != null && userRepository.existsByPhone(phone)) {
            throw new ConflictException("Phone number is already registered");
        }

        User user = User.builder()
                .name(request.name().trim())
                .email(email)
                .phone(phone)
                .password(passwordEncoder.encode(request.password()))
                .build();
        User saved = userRepository.save(user);
        String token = jwtService.generateToken(new UserPrincipal(saved));
        return new AuthResponse(token, userMapper.toResponse(saved));
    }

    public AuthResponse login(LoginRequest request) {
        User user = findLoginUser(request);
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }
        String token = jwtService.generateToken(new UserPrincipal(user));
        return new AuthResponse(token, userMapper.toResponse(user));
    }

    public AuthResponse googleLogin(GoogleLoginRequest request) {
        if (googleOAuthClientId == null || googleOAuthClientId.isBlank()) {
            throw new BadRequestException("Google OAuth client ID is not configured");
        }

        GoogleTokenInfo tokenInfo = verifyGoogleCredential(request.credential());
        if (!googleOAuthClientId.equals(tokenInfo.aud()) || !"true".equalsIgnoreCase(tokenInfo.emailVerified())) {
            throw new BadCredentialsException("Invalid Google credential");
        }

        String email = tokenInfo.email().trim().toLowerCase();
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.save(User.builder()
                        .name(tokenInfo.name() == null || tokenInfo.name().isBlank() ? email : tokenInfo.name())
                        .email(email)
                        .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                        .build()));

        String token = jwtService.generateToken(new UserPrincipal(user));
        return new AuthResponse(token, userMapper.toResponse(user));
    }

    private User findLoginUser(LoginRequest request) {
        if (request.email() != null && !request.email().isBlank()) {
            return userRepository.findByEmail(request.email().trim().toLowerCase())
                    .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));
        }
        String phone = normalizePhone(request.phone());
        if (phone != null) {
            return userRepository.findByPhone(phone)
                    .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));
        }
        throw new BadCredentialsException("Email or phone is required");
    }

    private String normalizePhone(String phone) {
        if (phone == null || phone.isBlank()) {
            return null;
        }
        return phone.replaceAll("\\s+", "");
    }

    private GoogleTokenInfo verifyGoogleCredential(String credential) {
        URI uri = UriComponentsBuilder.fromUriString("https://oauth2.googleapis.com/tokeninfo")
                .queryParam("id_token", credential)
                .build()
                .toUri();
        try {
            Map<?, ?> response = restClient.get().uri(uri).retrieve().body(Map.class);
            if (response == null || response.get("email") == null) {
                throw new BadCredentialsException("Invalid Google credential");
            }
            return new GoogleTokenInfo(
                    String.valueOf(response.get("aud")),
                    String.valueOf(response.get("email")),
                    String.valueOf(response.get("email_verified")),
                    response.get("name") == null ? null : String.valueOf(response.get("name"))
            );
        } catch (RuntimeException ex) {
            throw new BadCredentialsException("Invalid Google credential");
        }
    }

    private record GoogleTokenInfo(String aud, String email, String emailVerified, String name) {
    }
}
