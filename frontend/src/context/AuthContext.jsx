import { createContext, useContext, useMemo } from 'react';
import { authService } from '../services/authService';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useLocalStorage('shelflife_auth', null);

  const value = useMemo(() => ({
    user: auth?.user || null,
    token: auth?.token || null,
    isAuthenticated: Boolean(auth?.token),
    async login(payload) {
      const data = await authService.login(payload);
      setAuth(data);
      return data;
    },
    async register(payload) {
      const data = await authService.register(payload);
      setAuth(data);
      return data;
    },
    updateUser(user) {
      setAuth((current) => ({ ...current, user }));
    },
    logout() {
      setAuth(null);
    },
  }), [auth, setAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
