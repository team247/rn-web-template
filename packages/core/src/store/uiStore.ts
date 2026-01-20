import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface UIState {
  theme: Theme;
  isDrawerOpen: boolean;
  isLoading: boolean;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'warning' | 'info' | null;
  setTheme: (theme: Theme) => void;
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  showToast: (
    message: string,
    type?: 'success' | 'error' | 'warning' | 'info'
  ) => void;
  hideToast: () => void;
}

/**
 * Create storage adapter for UI preferences.
 * UI data doesn't need encryption, so we use regular localStorage.
 * This is different from auth storage which uses secure storage on mobile.
 */
const createUIStorage = () => {
  if (typeof window !== 'undefined' && 'localStorage' in window) {
    return createJSONStorage(() => localStorage);
  }
  // Fallback for SSR or environments without localStorage
  return createJSONStorage(() => ({
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  }));
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'system',
      isDrawerOpen: false,
      isLoading: false,
      toastMessage: null,
      toastType: null,

      setTheme: (theme) => set({ theme }),

      toggleDrawer: () =>
        set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      setDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen }),

      setLoading: (isLoading) => set({ isLoading }),

      showToast: (message, type = 'info') =>
        set({ toastMessage: message, toastType: type }),

      hideToast: () => set({ toastMessage: null, toastType: null }),
    }),
    {
      name: 'ui-storage',
      storage: createUIStorage(),
      // Only persist theme preference, not transient UI state
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

// Selectors
export const selectTheme = (state: UIState) => state.theme;
export const selectIsDrawerOpen = (state: UIState) => state.isDrawerOpen;
export const selectIsLoading = (state: UIState) => state.isLoading;
