import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const rawAuth = localStorage.getItem('shelflife_auth');
  if (rawAuth) {
    const auth = JSON.parse(rawAuth);
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('shelflife_auth');
      window.location.assign('/login');
    }
    return Promise.reject(error);
  },
);

export function apiMessage(error, fallback = 'Something went wrong') {
  return error.response?.data?.message || fallback;
}
