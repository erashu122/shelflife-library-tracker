package com.shelflife.mapper;

import com.shelflife.dto.library.LibraryBookResponse;
import com.shelflife.entity.UserBook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserBookMapper {

    private final BookMapper bookMapper;

    public LibraryBookResponse toResponse(UserBook userBook) {
        return new LibraryBookResponse(
                userBook.getId(),
                bookMapper.toResponse(userBook.getBook()),
                userBook.getStatus(),
                userBook.getProgress(),
                userBook.getRating(),
                userBook.getReview(),
                userBook.getCreatedAt(),
                userBook.getUpdatedAt()
        );
    }
}
