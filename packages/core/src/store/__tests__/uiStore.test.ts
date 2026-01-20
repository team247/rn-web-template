import { act, renderHook } from '@testing-library/react';
import { useUIStore } from '../uiStore';

describe('uiStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { result } = renderHook(() => useUIStore());
    act(() => {
      result.current.setTheme('system');
      result.current.setDrawerOpen(false);
      result.current.setLoading(false);
      result.current.hideToast();
    });
  });

  describe('theme', () => {
    it('should have default theme as system', () => {
      const { result } = renderHook(() => useUIStore());
      expect(result.current.theme).toBe('system');
    });

    it('should update theme', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');

      act(() => {
        result.current.setTheme('light');
      });

      expect(result.current.theme).toBe('light');
    });
  });

  describe('drawer', () => {
    it('should toggle drawer', () => {
      const { result } = renderHook(() => useUIStore());

      expect(result.current.isDrawerOpen).toBe(false);

      act(() => {
        result.current.toggleDrawer();
      });

      expect(result.current.isDrawerOpen).toBe(true);

      act(() => {
        result.current.toggleDrawer();
      });

      expect(result.current.isDrawerOpen).toBe(false);
    });

    it('should set drawer open state directly', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setDrawerOpen(true);
      });

      expect(result.current.isDrawerOpen).toBe(true);
    });
  });

  describe('loading', () => {
    it('should update loading state', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setLoading(true);
      });

      expect(result.current.isLoading).toBe(true);

      act(() => {
        result.current.setLoading(false);
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('toast', () => {
    it('should show toast with default type', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.showToast('Test message');
      });

      expect(result.current.toastMessage).toBe('Test message');
      expect(result.current.toastType).toBe('info');
    });

    it('should show toast with custom type', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.showToast('Error message', 'error');
      });

      expect(result.current.toastMessage).toBe('Error message');
      expect(result.current.toastType).toBe('error');
    });

    it('should hide toast', () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.showToast('Test message', 'success');
      });

      act(() => {
        result.current.hideToast();
      });

      expect(result.current.toastMessage).toBeNull();
      expect(result.current.toastType).toBeNull();
    });
  });
});
