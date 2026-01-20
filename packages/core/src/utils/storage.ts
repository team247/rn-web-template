/**
 * Cross-platform storage abstraction
 * Works with both React Native (expo-secure-store for sensitive data) and Web (localStorage)
 */

import { createJSONStorage, type StateStorage } from 'zustand/middleware';

// Storage interface
interface Storage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
  getAllKeys: () => Promise<string[]>;
}

// Web storage implementation
const webStorage: Storage = {
  getItem: async (key: string) => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  clear: async () => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
  getAllKeys: async () => {
    if (typeof window === 'undefined') return [];
    return Object.keys(localStorage);
  },
};

// Default to web storage, can be overridden for React Native
let storageImplementation: Storage = webStorage;

// Secure storage for sensitive data (tokens)
// On mobile, this should be set to expo-secure-store
let secureStorageImplementation: Storage = webStorage;

/**
 * Set the storage implementation (useful for React Native)
 */
export const setStorageImplementation = (storage: Storage) => {
  storageImplementation = storage;
};

/**
 * Set the secure storage implementation for sensitive data
 * On mobile, use expo-secure-store
 */
export const setSecureStorageImplementation = (storage: Storage) => {
  secureStorageImplementation = storage;
};

/**
 * Create a Zustand-compatible storage adapter
 * Uses secure storage on mobile for auth data
 */
export const createAuthStorage = (): StateStorage => {
  return {
    getItem: async (name: string): Promise<string | null> => {
      try {
        return await secureStorageImplementation.getItem(name);
      } catch {
        return null;
      }
    },
    setItem: async (name: string, value: string): Promise<void> => {
      try {
        await secureStorageImplementation.setItem(name, value);
      } catch {
        // Silently fail - storage may not be available
      }
    },
    removeItem: async (name: string): Promise<void> => {
      try {
        await secureStorageImplementation.removeItem(name);
      } catch {
        // Silently fail
      }
    },
  };
};

/**
 * Create Zustand JSON storage with secure storage
 */
export const createSecureJSONStorage = () => {
  return createJSONStorage(() => createAuthStorage());
};

/**
 * Storage API with JSON serialization
 */
export const storage = {
  /**
   * Get a value from storage, parsing JSON
   */
  get: async <T>(key: string): Promise<T | null> => {
    try {
      const value = await storageImplementation.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch {
      return null;
    }
  },

  /**
   * Set a value in storage, serializing to JSON
   */
  set: async <T>(key: string, value: T): Promise<void> => {
    await storageImplementation.setItem(key, JSON.stringify(value));
  },

  /**
   * Remove a value from storage
   */
  remove: async (key: string): Promise<void> => {
    await storageImplementation.removeItem(key);
  },

  /**
   * Clear all values from storage
   */
  clear: async (): Promise<void> => {
    await storageImplementation.clear();
  },

  /**
   * Get all keys in storage
   */
  getAllKeys: async (): Promise<string[]> => {
    return storageImplementation.getAllKeys();
  },

  /**
   * Get multiple values by keys
   */
  multiGet: async <T>(keys: string[]): Promise<(T | null)[]> => {
    return Promise.all(keys.map((key) => storage.get<T>(key)));
  },

  /**
   * Set multiple key-value pairs
   */
  multiSet: async <T>(items: [string, T][]): Promise<void> => {
    await Promise.all(items.map(([key, value]) => storage.set(key, value)));
  },
};

// Common storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  LAST_SYNC: 'last_sync',
} as const;
