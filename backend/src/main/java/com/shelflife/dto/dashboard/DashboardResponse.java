package com.shelflife.dto.dashboard;

import com.shelflife.dto.library.LibraryBookResponse;

import java.util.List;

public record DashboardResponse(
        long totalBooks,
        long currentlyReading,
        long completedBooks,
        long wantToRead,
        double averageRating,
        List<StatusCount> statusCounts,
        List<LibraryBookResponse> recentlyAdded
) {
}
