import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import { ErrorBoundary } from '../ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <Text>No error</Text>;
};

// Suppress console.error during tests since we expect errors
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  describe('normal rendering', () => {
    it('should render children when no error', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <Text>Normal content</Text>
        </ErrorBoundary>
      );
      expect(getByText('Normal content')).toBeTruthy();
    });

    it('should render multiple children', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <Text>Child 1</Text>
          <Text>Child 2</Text>
        </ErrorBoundary>
      );
      expect(getByText('Child 1')).toBeTruthy();
      expect(getByText('Child 2')).toBeTruthy();
    });
  });

  describe('error handling', () => {
    it('should catch errors and display default fallback', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
      expect(getByText('Something went wrong')).toBeTruthy();
      expect(getByText('Test error message')).toBeTruthy();
    });

    it('should display Try Again button', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
      expect(getByText('Try Again')).toBeTruthy();
    });

    it('should display error message in fallback', () => {
      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
      expect(getByText('Test error message')).toBeTruthy();
    });
  });

  describe('custom fallback', () => {
    it('should render custom fallback when provided', () => {
      const { getByText, queryByText } = render(
        <ErrorBoundary fallback={<Text>Custom error UI</Text>}>
          <ThrowError />
        </ErrorBoundary>
      );
      expect(getByText('Custom error UI')).toBeTruthy();
      expect(queryByText('Something went wrong')).toBeNull();
    });

    it('should render complex custom fallback', () => {
      const { getByText } = render(
        <ErrorBoundary
          fallback={
            <View>
              <Text>Error Title</Text>
              <Text>Error Description</Text>
            </View>
          }
        >
          <ThrowError />
        </ErrorBoundary>
      );
      expect(getByText('Error Title')).toBeTruthy();
      expect(getByText('Error Description')).toBeTruthy();
    });
  });

  describe('onError callback', () => {
    it('should call onError when error occurs', () => {
      const onError = jest.fn();
      render(
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>
      );
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({ componentStack: expect.any(String) })
      );
    });

    it('should pass correct error to onError', () => {
      const onError = jest.fn();
      render(
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>
      );
      const [error] = onError.mock.calls[0];
      expect(error.message).toBe('Test error message');
    });
  });

  describe('reset functionality', () => {
    it('should reset error state when Try Again is pressed', () => {
      let shouldThrow = true;
      const TestComponent = () => {
        if (shouldThrow) {
          throw new Error('Test error');
        }
        return <Text>Recovered</Text>;
      };

      const { getByText, queryByText } = render(
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      );

      expect(getByText('Something went wrong')).toBeTruthy();

      // Fix the error before pressing Try Again
      shouldThrow = false;

      fireEvent.press(getByText('Try Again'));

      // After reset, it should try to render children again
      // Since shouldThrow is now false, it should show "Recovered"
      expect(queryByText('Something went wrong')).toBeNull();
      expect(getByText('Recovered')).toBeTruthy();
    });

    it('should call onReset when Try Again is pressed', () => {
      const onReset = jest.fn();
      let shouldThrow = true;

      const TestComponent = () => {
        if (shouldThrow) {
          throw new Error('Test error');
        }
        return <Text>Content</Text>;
      };

      const { getByText } = render(
        <ErrorBoundary onReset={onReset}>
          <TestComponent />
        </ErrorBoundary>
      );

      shouldThrow = false;
      fireEvent.press(getByText('Try Again'));

      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });

  describe('error without message', () => {
    it('should show default message when error has no message', () => {
      const ThrowEmptyError = () => {
        throw new Error();
      };

      const { getByText } = render(
        <ErrorBoundary>
          <ThrowEmptyError />
        </ErrorBoundary>
      );
      expect(getByText('An unexpected error occurred')).toBeTruthy();
    });
  });
});
