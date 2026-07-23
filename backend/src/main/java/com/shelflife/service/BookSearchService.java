package com.shelflife.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.shelflife.dto.book.BookResponse;
import com.shelflife.dto.book.BookSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class BookSearchService {

    private final RestClient restClient;

    @Value("${app.google-books.api-key}")
    private String apiKey;

    public BookSearchResponse search(String query, int page) {
        int safePage = Math.max(page, 0);
        int maxResults = 12;
        URI uri = UriComponentsBuilder.fromUriString("https://www.googleapis.com/books/v1/volumes")
                .queryParam("q", query)
                .queryParam("startIndex", safePage * maxResults)
                .queryParam("maxResults", maxResults)
                .queryParamIfPresent("key", apiKey == null || apiKey.isBlank()
                        ? java.util.Optional.empty()
                        : java.util.Optional.of(apiKey))
                .build()
                .toUri();

        JsonNode response = restClient.get().uri(uri).retrieve().body(JsonNode.class);
        if (response == null) {
            return new BookSearchResponse(List.of(), safePage, 0);
        }

        List<BookResponse> books = new ArrayList<>();
        response.path("items").forEach(item -> books.add(toBookResponse(item)));
        return new BookSearchResponse(books, safePage, response.path("totalItems").asInt(0));
    }

    private BookResponse toBookResponse(JsonNode item) {
        JsonNode info = item.path("volumeInfo");
        return new BookResponse(
                null,
                item.path("id").asText(),
                info.path("title").asText("Untitled"),
                join(info.path("authors")),
                info.path("publisher").asText(null),
                isbn(info.path("industryIdentifiers")),
                image(info.path("imageLinks")),
                info.path("description").asText(null),
                info.path("pageCount").isMissingNode() ? null : info.path("pageCount").asInt(),
                join(info.path("categories"))
        );
    }

    private String join(JsonNode node) {
        if (!node.isArray()) {
            return null;
        }
        return String.join(", ", StreamSupport.stream(node.spliterator(), false)
                .map(JsonNode::asText)
                .toList());
    }

    private String isbn(JsonNode identifiers) {
        if (!identifiers.isArray()) {
            return null;
        }
        for (JsonNode identifier : identifiers) {
            String type = identifier.path("type").asText();
            if ("ISBN_13".equals(type)) {
                return identifier.path("identifier").asText();
            }
        }
        return identifiers.size() > 0 ? identifiers.get(0).path("identifier").asText(null) : null;
    }

    private String image(JsonNode imageLinks) {
        String image = imageLinks.path("thumbnail").asText(null);
        return image == null ? null : image.replace("http://", "https://");
    }
}
