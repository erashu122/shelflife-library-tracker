package com.shelflife.dto.user;

import java.time.Instant;

public record UserResponse(String id, String name, String email, String phone, Instant createdAt) {
}
