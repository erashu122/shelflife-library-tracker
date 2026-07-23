package com.shelflife.service;

import com.shelflife.dto.dashboard.DashboardResponse;
import com.shelflife.dto.dashboard.StatusCount;
import com.shelflife.entity.ReadingStatus;
import com.shelflife.entity.User;
import com.shelflife.mapper.UserBookMapper;
import com.shelflife.repository.UserBookRepository;
import com.shelflife.security.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final CurrentUserService currentUserService;
    private final UserBookRepository userBookRepository;
    private final UserBookMapper userBookMapper;

    public DashboardResponse getDashboard() {
        User user = currentUserService.getCurrentUser();
        var all = userBookRepository.findByUserId(user.getId(), Sort.by(Sort.Direction.DESC, "createdAt"));
        double averageRating = all.stream()
                .filter(book -> book.getRating() != null)
                .mapToInt(book -> book.getRating())
                .average()
                .orElse(0.0);
        var statusCounts = Arrays.stream(ReadingStatus.values())
                .map(status -> new StatusCount(status, userBookRepository.countByUserIdAndStatus(user.getId(), status)))
                .toList();

        return new DashboardResponse(
                all.size(),
                userBookRepository.countByUserIdAndStatus(user.getId(), ReadingStatus.READING),
                userBookRepository.countByUserIdAndStatus(user.getId(), ReadingStatus.READ),
                userBookRepository.countByUserIdAndStatus(user.getId(), ReadingStatus.WANT_TO_READ),
                Math.round(averageRating * 10.0) / 10.0,
                statusCounts,
                all.stream().limit(5).map(userBookMapper::toResponse).toList()
        );
    }
}
