/**
 * Initialize secure storage for mobile using expo-secure-store
 * This provides encrypted storage for sensitive data like auth tokens
 */

import * as SecureStore from 'expo-secure-store';
import { setSecureStorageImplementation } from '@app/core';

// expo-secure-store adapter that implements our Storage interface
const secureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {
      // Silently fail if storage is not available
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {
      // Silently fail
    }
  },
  clear: async (): Promise<void> => {
    // SecureStore doesn't have a clear method
    // We would need to track keys separately to implement this
  },
  getAllKeys: async (): Promise<string[]> => {
    // SecureStore doesn't have a getAllKeys method
    return [];
  },
};

/**
 * Initialize secure storage - call this before app renders
 */
export function initializeSecureStorage() {
  setSecureStorageImplementation(secureStoreAdapter);
}
