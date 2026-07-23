package com.shelflife.repository;

import com.shelflife.entity.ReadingStatus;
import com.shelflife.entity.UserBook;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserBookRepository extends MongoRepository<UserBook, String> {
    List<UserBook> findByUserId(String userId, Sort sort);

    Optional<UserBook> findByIdAndUserId(String id, String userId);

    boolean existsByUserIdAndBookGoogleBookId(String userId, String googleBookId);

    long countByUserIdAndStatus(String userId, ReadingStatus status);

    void deleteByUserId(String userId);
}
