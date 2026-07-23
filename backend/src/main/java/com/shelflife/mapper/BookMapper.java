package com.shelflife.mapper;

import com.shelflife.dto.book.BookResponse;
import com.shelflife.entity.Book;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {

    public BookResponse toResponse(Book book) {
        return new BookResponse(
                book.getId(),
                book.getGoogleBookId(),
                book.getTitle(),
                book.getAuthor(),
                book.getPublisher(),
                book.getIsbn(),
                book.getCoverImage(),
                book.getDescription(),
                book.getPageCount(),
                book.getCategories()
        );
    }
}
