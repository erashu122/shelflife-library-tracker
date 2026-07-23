package com.shelflife.dto.user;

import jakarta.validation.constraints.Size;

public record ProfileUpdateRequest(
        @Size(max = 80) String name,
        @Size(min = 8, max = 120) String currentPassword,
        @Size(min = 8, max = 120) String newPassword
) {
}
