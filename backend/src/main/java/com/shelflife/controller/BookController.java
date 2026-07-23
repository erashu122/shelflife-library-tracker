package com.shelflife.controller;

import com.shelflife.dto.book.BookSearchResponse;
import com.shelflife.service.BookSearchService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Tag(name = "Books")
public class BookController {

    private final BookSearchService bookSearchService;

    @GetMapping("/search")
    public BookSearchResponse search(
            @RequestParam("q") @NotBlank String query,
            @RequestParam(defaultValue = "0") int page
    ) {
        return bookSearchService.search(query, page);
    }
}
