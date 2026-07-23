package com.shelflife.dto.auth;

import com.shelflife.dto.user.UserResponse;

public record AuthResponse(String token, UserResponse user) {
}
