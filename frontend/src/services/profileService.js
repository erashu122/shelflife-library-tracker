import { api } from './api';

export const profileService = {
  update: (payload) => api.put('/profile', payload).then((res) => res.data),
  remove: () => api.delete('/profile'),
};
