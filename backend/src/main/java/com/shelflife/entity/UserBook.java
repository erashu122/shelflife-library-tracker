package com.shelflife.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_books")
@CompoundIndex(name = "user_book_unique", def = "{'userId': 1, 'book.googleBookId': 1}", unique = true)
public class UserBook {

    @Id
    private String id;

    @Indexed
    private String userId;

    private Book book;

    private ReadingStatus status;

    private Integer progress;

    private Integer rating;
    private String review;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
