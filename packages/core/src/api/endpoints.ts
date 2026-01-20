import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
  UserProfile,
} from '../types';

import { api } from './client';

// Auth endpoints
export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),

  register: (data: Omit<RegisterCredentials, 'confirmPassword'>) =>
    api.post<AuthResponse>('/auth/register', data),

  logout: () => api.post<void>('/auth/logout'),

  refreshToken: (refreshToken: string) =>
    api.post<AuthResponse>('/auth/refresh', { refreshToken }),

  forgotPassword: (email: string) =>
    api.post<{ message: string }>('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post<{ message: string }>('/auth/reset-password', { token, password }),
};

// User endpoints
export const userApi = {
  getMe: () => api.get<User>('/users/me'),

  getProfile: (userId: string) => api.get<UserProfile>(`/users/${userId}`),

  updateProfile: (data: Partial<UserProfile>) =>
    api.patch<UserProfile>('/users/me', data),

  updateAvatar: (avatarUrl: string) =>
    api.patch<User>('/users/me/avatar', { avatar: avatarUrl }),

  deleteAccount: () => api.delete<void>('/users/me'),
};

// Example resource endpoints
export const resourceApi = {
  getAll: (params?: { page?: number; pageSize?: number }) =>
    api.get<{ data: unknown[]; total: number }>('/resources', params),

  getById: (id: string) => api.get<unknown>(`/resources/${id}`),

  create: (data: unknown) => api.post<unknown>('/resources', data),

  update: (id: string, data: unknown) =>
    api.put<unknown>(`/resources/${id}`, data),

  delete: (id: string) => api.delete<void>(`/resources/${id}`),
};
