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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    public AuthResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new ConflictException("Email is already registered");
        }

        User user = User.builder()
                .name(request.name().trim())
                .email(email)
                .password(passwordEncoder.encode(request.password()))
                .build();
        User saved = userRepository.save(user);
        String token = jwtService.generateToken(new UserPrincipal(saved));
        return new AuthResponse(token, userMapper.toResponse(saved));
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.email().trim().toLowerCase(),
                request.password()
        ));

        User user = userRepository.findByEmail(request.email().trim().toLowerCase())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        String token = jwtService.generateToken(new UserPrincipal(user));
        return new AuthResponse(token, userMapper.toResponse(user));
    }
}
