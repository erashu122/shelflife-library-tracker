package com.shelflife.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record GoogleLoginRequest(@NotBlank String credential) {
}
