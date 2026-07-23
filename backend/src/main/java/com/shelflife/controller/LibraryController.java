package com.shelflife.controller;

import com.shelflife.dto.library.AddLibraryBookRequest;
import com.shelflife.dto.library.LibraryBookResponse;
import com.shelflife.dto.library.UpdateLibraryBookRequest;
import com.shelflife.entity.ReadingStatus;
import com.shelflife.service.LibraryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/library")
@RequiredArgsConstructor
@Tag(name = "Library")
public class LibraryController {

    private final LibraryService libraryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LibraryBookResponse add(@Valid @RequestBody AddLibraryBookRequest request) {
        return libraryService.add(request);
    }

    @GetMapping
    public List<LibraryBookResponse> list(
            @RequestParam(required = false) ReadingStatus status,
            @RequestParam(defaultValue = "recent") String sort
    ) {
        return libraryService.list(status, sort);
    }

    @GetMapping("/{id}")
    public LibraryBookResponse get(@PathVariable String id) {
        return libraryService.get(id);
    }

    @PutMapping("/{id}")
    public LibraryBookResponse update(@PathVariable String id, @Valid @RequestBody UpdateLibraryBookRequest request) {
        return libraryService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        libraryService.delete(id);
    }
}
