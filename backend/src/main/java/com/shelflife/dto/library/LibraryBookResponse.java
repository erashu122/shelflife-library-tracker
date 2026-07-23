package com.shelflife.dto.library;

import com.shelflife.dto.book.BookResponse;
import com.shelflife.entity.ReadingStatus;

import java.time.Instant;

public record LibraryBookResponse(
        String id,
        BookResponse book,
        ReadingStatus status,
        Integer progress,
        Integer rating,
        String review,
        Instant createdAt,
        Instant updatedAt
) {
}
