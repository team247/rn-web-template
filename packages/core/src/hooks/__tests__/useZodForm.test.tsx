import { renderHook, act } from '@testing-library/react';
import { z } from 'zod';
import { useZodForm } from '../useZodForm';

describe('useZodForm', () => {
  const testSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    age: z.number().min(18, 'Must be 18 or older').optional(),
  });

  describe('initialization', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() =>
        useZodForm({
          schema: testSchema,
          defaultValues: {
            email: '',
            password: '',
          },
        })
      );

      expect(result.current.getValues()).toEqual({
        email: '',
        password: '',
      });
    });

    it('should initialize with provided default values', () => {
      const { result } = renderHook(() =>
        useZodForm({
          schema: testSchema,
          defaultValues: {
            email: 'test@example.com',
            password: 'password123',
          },
        })
      );

      expect(result.current.getValues('email')).toBe('test@example.com');
      expect(result.current.getValues('password')).toBe('password123');
    });
  });

  describe('validation', () => {
    it('should validate email format', async () => {
      const { result } = renderHook(() =>
        useZodForm({
          schema: testSchema,
          defaultValues: {
            email: 'invalid-email',
            password: 'password123',
          },
        })
      );

      await act(async () => {
        await result.current.trigger('email');
      });

      expect(result.current.formState.errors.email?.message).toBe(
        'Invalid email address'
      );
    });

    it('should validate password length', async () => {
      const { result } = renderHook(() =>
        useZodForm({
          schema: testSchema,
          defaultValues: {
            email: 'test@example.com',
            password: 'short',
          },
        })
      );

      await act(async () => {
        await result.current.trigger('password');
      });

      expect(result.current.formState.errors.password?.message).toBe(
        'Password must be at least 8 characters'
      );
    });

    it('should pass validation with correct values', async () => {
      const { result } = renderHook(() =>
        useZodForm({
          schema: testSchema,
          defaultValues: {
            email: 'test@example.com',
            password: 'password123',
          },
        })
      );

      let isValid = false;
      await act(async () => {
        isValid = await result.current.trigger();
      });

      expect(isValid).toBe(true);
      expect(result.current.formState.errors.email).toBeUndefined();
      expect(result.current.formState.errors.password).toBeUndefined();
    });
  });

  describe('form operations', () => {
    it('should register fields', () => {
      const { result } = renderHook(() =>
        useZodForm({
          schema: testSchema,
          defaultValues: {
            email: '',
            password: '',
          },
        })
      );

      const emailField = result.current.register('email');
      expect(emailField.name).toBe('email');
      expect(typeof emailField.onChange).toBe('function');
      expect(typeof emailField.onBlur).toBe('function');
    });

    it('should set and get values', () => {
      const { result } = renderHook(() =>
        useZodForm({
          schema: testSchema,
          defaultValues: {
            email: '',
            password: '',
          },
        })
      );

      act(() => {
        result.current.setValue('email', 'new@example.com');
      });

      expect(result.current.getValues('email')).toBe('new@example.com');
    });

    it('should reset form', () => {
      const { result } = renderHook(() =>
        useZodForm({
          schema: testSchema,
          defaultValues: {
            email: 'original@example.com',
            password: 'original123',
          },
        })
      );

      act(() => {
        result.current.setValue('email', 'changed@example.com');
      });

      expect(result.current.getValues('email')).toBe('changed@example.com');

      act(() => {
        result.current.reset();
      });

      expect(result.current.getValues('email')).toBe('original@example.com');
    });

    it('should handle submit', async () => {
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useZodForm({
          schema: testSchema,
          defaultValues: {
            email: 'test@example.com',
            password: 'password123',
          },
        })
      );

      await act(async () => {
        await result.current.handleSubmit(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith(
        {
          email: 'test@example.com',
          password: 'password123',
        },
        expect.anything()
      );
    });

    it('should not submit with invalid data', async () => {
      const onSubmit = jest.fn();
      const onError = jest.fn();
      const { result } = renderHook(() =>
        useZodForm({
          schema: testSchema,
          defaultValues: {
            email: 'invalid',
            password: 'short',
          },
        })
      );

      await act(async () => {
        await result.current.handleSubmit(onSubmit, onError)();
      });

      expect(onSubmit).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalled();
    });
  });

  describe('form state', () => {
    it('should track dirty state', () => {
      const { result } = renderHook(() =>
        useZodForm({
          schema: testSchema,
          defaultValues: {
            email: '',
            password: '',
          },
        })
      );

      expect(result.current.formState.isDirty).toBe(false);

      act(() => {
        result.current.setValue('email', 'test@example.com', {
          shouldDirty: true,
        });
      });

      expect(result.current.formState.isDirty).toBe(true);
    });
  });
});
