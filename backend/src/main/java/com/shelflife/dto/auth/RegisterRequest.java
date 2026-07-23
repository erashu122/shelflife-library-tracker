package com.shelflife.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank @Size(max = 80) String name,
        @NotBlank @Email @Size(max = 160) String email,
        @Pattern(regexp = "^$|^[+]?[0-9]{10,15}$", message = "Phone must be 10 to 15 digits") String phone,
        @NotBlank @Size(min = 8, max = 120) String password
) {
}
