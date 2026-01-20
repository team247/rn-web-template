import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User, AuthTokens } from '../types';
import { setAccessToken } from '../api/client';
import { createSecureJSONStorage } from '../utils/storage';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({ user }),

      setTokens: (tokens) => {
        setAccessToken(tokens?.accessToken || null);
        set({ tokens });
      },

      login: (user, tokens) => {
        setAccessToken(tokens.accessToken);
        set({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        setAccessToken(null);
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      storage: createSecureJSONStorage(),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.tokens?.accessToken) {
          setAccessToken(state.tokens.accessToken);
        }
        state?.setLoading(false);
      },
    }
  )
);

// Selectors for better performance
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectIsLoading = (state: AuthState) => state.isLoading;
