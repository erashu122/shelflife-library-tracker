import { api } from './api';

export const authService = {
  register: (payload) => api.post('/auth/register', payload).then((res) => res.data),
  login: (payload) => api.post('/auth/login', payload).then((res) => res.data),
  googleLogin: (payload) => api.post('/auth/google', payload).then((res) => res.data),
};
