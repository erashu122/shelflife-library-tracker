import { api } from './api';

export const libraryService = {
  add: (payload) => api.post('/library', payload).then((res) => res.data),
  list: (params = {}) => api.get('/library', { params }).then((res) => res.data),
  get: (id) => api.get(`/library/${id}`).then((res) => res.data),
  update: (id, payload) => api.put(`/library/${id}`, payload).then((res) => res.data),
  remove: (id) => api.delete(`/library/${id}`),
};
