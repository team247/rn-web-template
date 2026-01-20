import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { userApi, authApi } from '../api';
import { useAuthStore } from '../store/authStore';
import type { LoginCredentials, UserProfile, User } from '../types';

// Query keys for consistent caching
export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  profile: (id: string) => [...userKeys.all, 'profile', id] as const,
};

// Get current user
export const useCurrentUser = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: userKeys.me(),
    queryFn: userApi.getMe,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get user profile by ID
export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: userKeys.profile(userId),
    queryFn: () => userApi.getProfile(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

// Login mutation
export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      const user: User = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        avatar: data.user.avatar,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      login(user, data.tokens);
      queryClient.setQueryData(userKeys.me(), user);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
    onError: () => {
      // Even if API fails, clear local state
      logout();
      queryClient.clear();
    },
  });
};

// Update profile mutation
export const useUpdateProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) => userApi.updateProfile(data),
    onSuccess: (updatedProfile) => {
      const user: User = {
        id: updatedProfile.id,
        email: updatedProfile.email,
        name: updatedProfile.name,
        avatar: updatedProfile.avatar,
        createdAt: updatedProfile.createdAt,
        updatedAt: updatedProfile.updatedAt,
      };
      setUser(user);
      queryClient.setQueryData(userKeys.me(), user);
    },
  });
};
