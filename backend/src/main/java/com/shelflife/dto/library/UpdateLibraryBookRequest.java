package com.shelflife.dto.library;

import com.shelflife.entity.ReadingStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record UpdateLibraryBookRequest(
        ReadingStatus status,
        @Min(0) @Max(100) Integer progress,
        @Min(1) @Max(5) Integer rating,
        String review
) {
}
