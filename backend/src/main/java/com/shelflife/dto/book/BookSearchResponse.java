package com.shelflife.dto.book;

import java.util.List;

public record BookSearchResponse(
        List<BookResponse> books,
        int page,
        int totalItems
) {
}
