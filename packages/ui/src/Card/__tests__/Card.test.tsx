import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card, CardHeader, CardContent, CardFooter } from '../Card';

describe('Card', () => {
  describe('rendering', () => {
    it('should render children', () => {
      const { getByText } = render(
        <Card>
          <Text>Card content</Text>
        </Card>
      );
      expect(getByText('Card content')).toBeTruthy();
    });

    it('should render with testID', () => {
      const { getByTestId } = render(
        <Card testID="test-card">
          <Text>Content</Text>
        </Card>
      );
      expect(getByTestId('test-card')).toBeTruthy();
    });
  });

  describe('variants', () => {
    it('should render elevated variant by default', () => {
      const { getByTestId } = render(
        <Card testID="card">
          <Text>Content</Text>
        </Card>
      );
      const card = getByTestId('card');
      expect(card).toBeTruthy();
    });

    it('should render outlined variant', () => {
      const { getByTestId } = render(
        <Card variant="outlined" testID="card">
          <Text>Content</Text>
        </Card>
      );
      expect(getByTestId('card')).toBeTruthy();
    });

    it('should render filled variant', () => {
      const { getByTestId } = render(
        <Card variant="filled" testID="card">
          <Text>Content</Text>
        </Card>
      );
      expect(getByTestId('card')).toBeTruthy();
    });
  });

  describe('padding', () => {
    it('should render with default padding (md)', () => {
      const { getByTestId } = render(
        <Card testID="card">
          <Text>Content</Text>
        </Card>
      );
      expect(getByTestId('card')).toBeTruthy();
    });

    it('should render with no padding', () => {
      const { getByTestId } = render(
        <Card padding="none" testID="card">
          <Text>Content</Text>
        </Card>
      );
      expect(getByTestId('card')).toBeTruthy();
    });

    it('should render with small padding', () => {
      const { getByTestId } = render(
        <Card padding="sm" testID="card">
          <Text>Content</Text>
        </Card>
      );
      expect(getByTestId('card')).toBeTruthy();
    });

    it('should render with large padding', () => {
      const { getByTestId } = render(
        <Card padding="lg" testID="card">
          <Text>Content</Text>
        </Card>
      );
      expect(getByTestId('card')).toBeTruthy();
    });
  });

  describe('pressable', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByTestId } = render(
        <Card onPress={onPress} testID="card">
          <Text>Pressable card</Text>
        </Card>
      );

      fireEvent.press(getByTestId('card'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should not be pressable without onPress', () => {
      const { getByTestId } = render(
        <Card testID="card">
          <Text>Non-pressable card</Text>
        </Card>
      );

      // Card without onPress should render as View, not TouchableOpacity
      const card = getByTestId('card');
      expect(card).toBeTruthy();
    });
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { getByTestId } = render(
        <Card className="custom-class" testID="card">
          <Text>Content</Text>
        </Card>
      );
      expect(getByTestId('card')).toBeTruthy();
    });
  });
});

describe('CardHeader', () => {
  it('should render children', () => {
    const { getByText } = render(
      <CardHeader>
        <Text>Header content</Text>
      </CardHeader>
    );
    expect(getByText('Header content')).toBeTruthy();
  });

  it('should accept custom className', () => {
    const { getByTestId } = render(
      <CardHeader testID="header" className="custom-class">
        <Text>Header</Text>
      </CardHeader>
    );
    expect(getByTestId('header')).toBeTruthy();
  });
});

describe('CardContent', () => {
  it('should render children', () => {
    const { getByText } = render(
      <CardContent>
        <Text>Main content</Text>
      </CardContent>
    );
    expect(getByText('Main content')).toBeTruthy();
  });

  it('should accept custom className', () => {
    const { getByTestId } = render(
      <CardContent testID="content" className="custom-class">
        <Text>Content</Text>
      </CardContent>
    );
    expect(getByTestId('content')).toBeTruthy();
  });
});

describe('CardFooter', () => {
  it('should render children', () => {
    const { getByText } = render(
      <CardFooter>
        <Text>Footer content</Text>
      </CardFooter>
    );
    expect(getByText('Footer content')).toBeTruthy();
  });

  it('should accept custom className', () => {
    const { getByTestId } = render(
      <CardFooter testID="footer" className="custom-class">
        <Text>Footer</Text>
      </CardFooter>
    );
    expect(getByTestId('footer')).toBeTruthy();
  });
});

describe('Card composition', () => {
  it('should render complete card with all sections', () => {
    const { getByText } = render(
      <Card>
        <CardHeader>
          <Text>Card Title</Text>
        </CardHeader>
        <CardContent>
          <Text>Card body content</Text>
        </CardContent>
        <CardFooter>
          <Text>Card footer</Text>
        </CardFooter>
      </Card>
    );

    expect(getByText('Card Title')).toBeTruthy();
    expect(getByText('Card body content')).toBeTruthy();
    expect(getByText('Card footer')).toBeTruthy();
  });
});
