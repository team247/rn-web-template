import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

import type { ApiError } from '../types/api';

const API_URL = process.env.API_URL || 'https://api.example.com';
const API_TIMEOUT = Number(process.env.API_TIMEOUT) || 30000;

let accessToken: string | null = null;
let refreshTokenFn: (() => Promise<string | null>) | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const setRefreshTokenHandler = (
  handler: () => Promise<string | null>
) => {
  refreshTokenFn = handler;
};

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - add auth token
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - handle errors and token refresh
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiError>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Handle 401 - attempt token refresh
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        refreshTokenFn
      ) {
        originalRequest._retry = true;

        try {
          const newToken = await refreshTokenFn();
          if (newToken) {
            accessToken = newToken;
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return client(originalRequest);
          }
        } catch {
          // Refresh failed, user needs to re-authenticate
          accessToken = null;
        }
      }

      // Transform error for consistent handling
      const apiError: ApiError = error.response?.data || {
        code: 'UNKNOWN_ERROR',
        message: error.message || 'An unexpected error occurred',
      };

      return Promise.reject(apiError);
    }
  );

  return client;
};

export const apiClient = createApiClient();

// Typed request helpers
export const api = {
  get: <T>(url: string, params?: Record<string, unknown>) =>
    apiClient.get<T>(url, { params }).then((res) => res.data),

  post: <T>(url: string, data?: unknown) =>
    apiClient.post<T>(url, data).then((res) => res.data),

  put: <T>(url: string, data?: unknown) =>
    apiClient.put<T>(url, data).then((res) => res.data),

  patch: <T>(url: string, data?: unknown) =>
    apiClient.patch<T>(url, data).then((res) => res.data),

  delete: <T>(url: string) =>
    apiClient.delete<T>(url).then((res) => res.data),
};
