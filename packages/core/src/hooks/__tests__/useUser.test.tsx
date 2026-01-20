import React from 'react';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  userKeys,
  useCurrentUser,
  useUserProfile,
  useLogin,
  useLogout,
  useUpdateProfile,
} from '../useUser';

// Mock the API
jest.mock('../../api', () => ({
  userApi: {
    getMe: jest.fn(),
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
  },
  authApi: {
    login: jest.fn(),
    logout: jest.fn(),
  },
}));

// Mock the auth store
const mockLogin = jest.fn();
const mockLogout = jest.fn();
const mockSetUser = jest.fn();
let mockIsAuthenticated = false;

jest.mock('../../store/authStore', () => ({
  useAuthStore: (selector: (state: any) => any) => {
    const state = {
      isAuthenticated: mockIsAuthenticated,
      login: mockLogin,
      logout: mockLogout,
      setUser: mockSetUser,
    };
    return selector(state);
  },
}));

import { userApi, authApi } from '../../api';

// Create a wrapper with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('userKeys', () => {
  it('should generate correct query keys', () => {
    expect(userKeys.all).toEqual(['user']);
    expect(userKeys.me()).toEqual(['user', 'me']);
    expect(userKeys.profile('123')).toEqual(['user', 'profile', '123']);
  });
});

describe('useCurrentUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsAuthenticated = false;
  });

  it('should not fetch when not authenticated', () => {
    mockIsAuthenticated = false;

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(userApi.getMe).not.toHaveBeenCalled();
  });

  it('should fetch user when authenticated', async () => {
    mockIsAuthenticated = true;
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test' };
    (userApi.getMe as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(userApi.getMe).toHaveBeenCalled();
    expect(result.current.data).toEqual(mockUser);
  });
});

describe('useUserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not fetch when userId is empty', () => {
    const { result } = renderHook(() => useUserProfile(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(userApi.getProfile).not.toHaveBeenCalled();
  });

  it('should fetch profile when userId is provided', async () => {
    const mockProfile = { id: '123', email: 'user@example.com', name: 'User' };
    (userApi.getProfile as jest.Mock).mockResolvedValue(mockProfile);

    const { result } = renderHook(() => useUserProfile('123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(userApi.getProfile).toHaveBeenCalledWith('123');
    expect(result.current.data).toEqual(mockProfile);
  });
});

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call login API and update store on success', async () => {
    const mockResponse = {
      user: { id: '1', email: 'test@example.com', name: 'Test' },
      tokens: { accessToken: 'token', refreshToken: 'refresh', expiresIn: 3600 },
    };
    (authApi.login as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate({ email: 'test@example.com', password: 'password' });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(authApi.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(mockLogin).toHaveBeenCalled();
  });

  it('should handle login error', async () => {
    const mockError = new Error('Invalid credentials');
    (authApi.login as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate({ email: 'test@example.com', password: 'wrong' });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });
});

describe('useLogout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call logout API and clear store on success', async () => {
    (authApi.logout as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(authApi.logout).toHaveBeenCalled();
    expect(mockLogout).toHaveBeenCalled();
  });

  it('should clear store even when API fails', async () => {
    (authApi.logout as jest.Mock).mockRejectedValue(new Error('API error'));

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    // Should still clear local state
    expect(mockLogout).toHaveBeenCalled();
  });
});

describe('useUpdateProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update profile and store on success', async () => {
    const mockUpdatedProfile = {
      id: '1',
      email: 'test@example.com',
      name: 'Updated Name',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-02',
    };
    (userApi.updateProfile as jest.Mock).mockResolvedValue(mockUpdatedProfile);

    const { result } = renderHook(() => useUpdateProfile(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate({ name: 'Updated Name' });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(userApi.updateProfile).toHaveBeenCalledWith({ name: 'Updated Name' });
    expect(mockSetUser).toHaveBeenCalled();
  });
});
