import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  describe('rendering', () => {
    it('should render children correctly', () => {
      const { getByText } = render(<Button>Click me</Button>);
      expect(getByText('Click me')).toBeTruthy();
    });

    it('should render with default props', () => {
      const { getByText } = render(<Button>Default</Button>);
      const button = getByText('Default');
      expect(button).toBeTruthy();
    });
  });

  describe('variants', () => {
    it('should render primary variant', () => {
      const { getByText } = render(<Button variant="primary">Primary</Button>);
      expect(getByText('Primary')).toBeTruthy();
    });

    it('should render secondary variant', () => {
      const { getByText } = render(<Button variant="secondary">Secondary</Button>);
      expect(getByText('Secondary')).toBeTruthy();
    });

    it('should render outline variant', () => {
      const { getByText } = render(<Button variant="outline">Outline</Button>);
      expect(getByText('Outline')).toBeTruthy();
    });

    it('should render ghost variant', () => {
      const { getByText } = render(<Button variant="ghost">Ghost</Button>);
      expect(getByText('Ghost')).toBeTruthy();
    });

    it('should render danger variant', () => {
      const { getByText } = render(<Button variant="danger">Danger</Button>);
      expect(getByText('Danger')).toBeTruthy();
    });
  });

  describe('sizes', () => {
    it('should render small size', () => {
      const { getByText } = render(<Button size="sm">Small</Button>);
      expect(getByText('Small')).toBeTruthy();
    });

    it('should render medium size', () => {
      const { getByText } = render(<Button size="md">Medium</Button>);
      expect(getByText('Medium')).toBeTruthy();
    });

    it('should render large size', () => {
      const { getByText } = render(<Button size="lg">Large</Button>);
      expect(getByText('Large')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button onPress={onPress}>Press me</Button>
      );

      fireEvent.press(getByText('Press me'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button onPress={onPress} disabled>
          Disabled
        </Button>
      );

      fireEvent.press(getByText('Disabled'));
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('should show loading indicator when loading', () => {
      const { queryByText } = render(
        <Button loading>Loading</Button>
      );

      // When loading, text should not be visible (replaced by ActivityIndicator)
      expect(queryByText('Loading')).toBeNull();
    });

    it('should not call onPress when loading', () => {
      const onPress = jest.fn();
      const { getByTestId } = render(
        <Button onPress={onPress} loading testID="loading-button">
          Loading
        </Button>
      );

      fireEvent.press(getByTestId('loading-button'));
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('fullWidth', () => {
    it('should render full width button', () => {
      const { getByText } = render(
        <Button fullWidth>Full Width</Button>
      );
      expect(getByText('Full Width')).toBeTruthy();
    });
  });
});
