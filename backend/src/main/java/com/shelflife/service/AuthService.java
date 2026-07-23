package com.shelflife.service;

import com.shelflife.dto.auth.AuthResponse;
import com.shelflife.dto.auth.LoginRequest;
import com.shelflife.dto.auth.RegisterRequest;
import com.shelflife.entity.User;
import com.shelflife.exception.ConflictException;
import com.shelflife.mapper.UserMapper;
import com.shelflife.repository.UserRepository;
import com.shelflife.security.JwtService;
import com.shelflife.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMapper userMapper;

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
}
