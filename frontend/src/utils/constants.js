export const READING_STATUSES = [
  { value: 'WANT_TO_READ', label: 'Want to Read' },
  { value: 'READING', label: 'Reading' },
  { value: 'READ', label: 'Read' },
];

export const SORT_OPTIONS = [
  { value: 'recent', label: 'Recently Updated' },
  { value: 'title', label: 'Title' },
  { value: 'rating', label: 'Rating' },
  { value: 'progress', label: 'Progress' },
];

export function statusLabel(value) {
  return READING_STATUSES.find((status) => status.value === value)?.label || value;
}
