// API
export {
  apiClient,
  api,
  setAccessToken,
  setRefreshTokenHandler,
  authApi,
  userApi,
  resourceApi,
} from './api';

// Store
export {
  useAuthStore,
  selectUser,
  selectIsAuthenticated,
  selectAuthIsLoading,
  useUIStore,
  selectTheme,
  selectIsDrawerOpen,
  selectUIIsLoading,
} from './store';

// Hooks
export {
  userKeys,
  useCurrentUser,
  useUserProfile,
  useLogin,
  useLogout,
  useUpdateProfile,
} from './hooks';

// Types
export type {
  User,
  UserProfile,
  LoginCredentials,
  RegisterCredentials,
  ApiError,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  AuthTokens,
  AuthResponse,
} from './types';

export {
  UserSchema,
  UserProfileSchema,
  LoginCredentialsSchema,
  RegisterCredentialsSchema,
  ApiErrorSchema,
  AuthTokensSchema,
} from './types';

// Utils
export {
  formatDate,
  formatRelativeTime,
  formatSmartDate,
  formatDateTime,
  formatTime,
  formatCurrency,
  formatCompactCurrency,
  parseCurrency,
  formatNumber,
  formatPercentage,
  storage,
  setStorageImplementation,
  STORAGE_KEYS,
} from './utils';
