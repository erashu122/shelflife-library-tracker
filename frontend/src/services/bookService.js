import { api } from './api';

export const bookService = {
  search: (query, page = 0) =>
    api.get('/books/search', { params: { q: query, page } }).then((res) => res.data),
};
