package com.shelflife.service;

import com.shelflife.dto.library.AddLibraryBookRequest;
import com.shelflife.dto.library.LibraryBookResponse;
import com.shelflife.dto.library.UpdateLibraryBookRequest;
import com.shelflife.entity.Book;
import com.shelflife.entity.ReadingStatus;
import com.shelflife.entity.User;
import com.shelflife.entity.UserBook;
import com.shelflife.exception.ConflictException;
import com.shelflife.exception.ResourceNotFoundException;
import com.shelflife.mapper.UserBookMapper;
import com.shelflife.repository.BookRepository;
import com.shelflife.repository.UserBookRepository;
import com.shelflife.security.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LibraryService {

    private final CurrentUserService currentUserService;
    private final BookRepository bookRepository;
    private final UserBookRepository userBookRepository;
    private final UserBookMapper userBookMapper;

    public LibraryBookResponse add(AddLibraryBookRequest request) {
        User user = currentUserService.getCurrentUser();
        if (userBookRepository.existsByUserIdAndBookGoogleBookId(user.getId(), request.googleBookId())) {
            throw new ConflictException("Book already exists in your library");
        }

        Book book = bookRepository.findByGoogleBookId(request.googleBookId())
                .orElseGet(() -> bookRepository.save(Book.builder()
                        .googleBookId(request.googleBookId())
                        .title(request.title())
                        .author(request.author())
                        .publisher(request.publisher())
                        .isbn(request.isbn())
                        .coverImage(request.coverImage())
                        .description(request.description())
                        .pageCount(request.pageCount())
                        .categories(request.categories())
                        .build()));

        UserBook userBook = UserBook.builder()
                .userId(user.getId())
                .book(book)
                .status(request.status())
                .progress(request.progress() == null ? defaultProgress(request.status()) : request.progress())
                .rating(request.rating())
                .review(request.review())
                .build();
        return userBookMapper.toResponse(userBookRepository.save(userBook));
    }

    public List<LibraryBookResponse> list(ReadingStatus status, String sort) {
        User user = currentUserService.getCurrentUser();
        List<UserBook> books = userBookRepository.findByUserId(user.getId(), Sort.by(Sort.Direction.DESC, "updatedAt"));
        return books.stream()
                .filter(book -> status == null || book.getStatus() == status)
                .sorted(sorter(sort))
                .map(userBookMapper::toResponse)
                .toList();
    }

    public LibraryBookResponse get(String id) {
        UserBook userBook = findOwned(id);
        return userBookMapper.toResponse(userBook);
    }

    public LibraryBookResponse update(String id, UpdateLibraryBookRequest request) {
        UserBook userBook = findOwned(id);
        if (request.status() != null) {
            userBook.setStatus(request.status());
            if (request.status() == ReadingStatus.READ && request.progress() == null) {
                userBook.setProgress(100);
            }
        }
        if (request.progress() != null) {
            userBook.setProgress(request.progress());
        }
        if (request.rating() != null) {
            userBook.setRating(request.rating());
        }
        if (request.review() != null) {
            userBook.setReview(request.review());
        }
        return userBookMapper.toResponse(userBookRepository.save(userBook));
    }

    public void delete(String id) {
        userBookRepository.delete(findOwned(id));
    }

    private UserBook findOwned(String id) {
        User user = currentUserService.getCurrentUser();
        return userBookRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Library book not found"));
    }

    private int defaultProgress(ReadingStatus status) {
        return status == ReadingStatus.READ ? 100 : 0;
    }

    private Comparator<UserBook> sorter(String sort) {
        return switch (sort == null ? "recent" : sort) {
            case "title" -> Comparator.comparing(book -> book.getBook().getTitle(), String.CASE_INSENSITIVE_ORDER);
            case "rating" -> Comparator.comparing(UserBook::getRating, Comparator.nullsLast(Comparator.reverseOrder()));
            case "progress" -> Comparator.comparing(UserBook::getProgress).reversed();
            default -> Comparator.comparing(UserBook::getUpdatedAt).reversed();
        };
    }
}
