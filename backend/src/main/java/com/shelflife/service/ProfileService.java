package com.shelflife.service;

import com.shelflife.dto.user.ProfileUpdateRequest;
import com.shelflife.dto.user.UserResponse;
import com.shelflife.entity.User;
import com.shelflife.exception.BadRequestException;
import com.shelflife.mapper.UserMapper;
import com.shelflife.repository.UserBookRepository;
import com.shelflife.repository.UserRepository;
import com.shelflife.security.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final CurrentUserService currentUserService;
    private final UserRepository userRepository;
    private final UserBookRepository userBookRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserResponse update(ProfileUpdateRequest request) {
        User user = currentUserService.getCurrentUser();
        if (request.name() != null && !request.name().isBlank()) {
            user.setName(request.name().trim());
        }
        if (request.newPassword() != null && !request.newPassword().isBlank()) {
            if (request.currentPassword() == null || !passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
                throw new BadRequestException("Current password is incorrect");
            }
            user.setPassword(passwordEncoder.encode(request.newPassword()));
        }
        return userMapper.toResponse(userRepository.save(user));
    }

    public void deleteAccount() {
        User user = currentUserService.getCurrentUser();
        userBookRepository.deleteByUserId(user.getId());
        userRepository.delete(user);
    }
}
