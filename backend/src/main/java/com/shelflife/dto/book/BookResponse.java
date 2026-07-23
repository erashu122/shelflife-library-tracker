package com.shelflife.dto.book;

public record BookResponse(
        String id,
        String googleBookId,
        String title,
        String author,
        String publisher,
        String isbn,
        String coverImage,
        String description,
        Integer pageCount,
        String categories
) {
}
