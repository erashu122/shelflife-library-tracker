package com.shelflife.dto.library;

import com.shelflife.entity.ReadingStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AddLibraryBookRequest(
        @NotBlank String googleBookId,
        @NotBlank @Size(max = 255) String title,
        @Size(max = 255) String author,
        @Size(max = 255) String publisher,
        @Size(max = 80) String isbn,
        String coverImage,
        String description,
        Integer pageCount,
        String categories,
        @NotNull ReadingStatus status,
        @Min(0) @Max(100) Integer progress,
        @Min(1) @Max(5) Integer rating,
        String review
) {
}
