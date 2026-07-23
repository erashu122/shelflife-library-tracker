package com.shelflife.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record LoginRequest(
        @Email String email,
        @Pattern(regexp = "^$|^[+]?[0-9]{10,15}$", message = "Phone must be 10 to 15 digits") String phone,
        @NotBlank String password
) {
}
