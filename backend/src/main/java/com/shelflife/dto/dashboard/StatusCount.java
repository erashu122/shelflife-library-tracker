package com.shelflife.dto.dashboard;

import com.shelflife.entity.ReadingStatus;

public record StatusCount(ReadingStatus status, long count) {
}
