import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Container, Screen } from '../Container';

describe('Container', () => {
  describe('rendering', () => {
    it('should render children', () => {
      const { getByText } = render(
        <Container>
          <Text>Content</Text>
        </Container>
      );
      expect(getByText('Content')).toBeTruthy();
    });

    it('should render with testID', () => {
      const { getByTestId } = render(
        <Container testID="test-container">
          <Text>Content</Text>
        </Container>
      );
      expect(getByTestId('test-container')).toBeTruthy();
    });
  });

  describe('safe area', () => {
    it('should wrap with SafeAreaView by default', () => {
      const { getByText } = render(
        <Container>
          <Text>Safe content</Text>
        </Container>
      );
      expect(getByText('Safe content')).toBeTruthy();
    });

    it('should not wrap with SafeAreaView when safe=false', () => {
      const { getByText } = render(
        <Container safe={false}>
          <Text>Unsafe content</Text>
        </Container>
      );
      expect(getByText('Unsafe content')).toBeTruthy();
    });
  });

  describe('scroll', () => {
    it('should not be scrollable by default', () => {
      const { getByText } = render(
        <Container>
          <Text>Non-scrollable</Text>
        </Container>
      );
      expect(getByText('Non-scrollable')).toBeTruthy();
    });

    it('should be scrollable when scroll=true', () => {
      const { getByText } = render(
        <Container scroll>
          <Text>Scrollable content</Text>
        </Container>
      );
      expect(getByText('Scrollable content')).toBeTruthy();
    });
  });

  describe('keyboard avoiding', () => {
    it('should not have keyboard avoiding by default', () => {
      const { getByText } = render(
        <Container>
          <Text>No keyboard avoiding</Text>
        </Container>
      );
      expect(getByText('No keyboard avoiding')).toBeTruthy();
    });

    it('should have keyboard avoiding when keyboard=true', () => {
      const { getByText } = render(
        <Container keyboard>
          <Text>With keyboard avoiding</Text>
        </Container>
      );
      expect(getByText('With keyboard avoiding')).toBeTruthy();
    });
  });

  describe('padding', () => {
    it('should have md padding by default', () => {
      const { getByText } = render(
        <Container>
          <Text>Default padding</Text>
        </Container>
      );
      expect(getByText('Default padding')).toBeTruthy();
    });

    it('should have no padding when padding=none', () => {
      const { getByText } = render(
        <Container padding="none">
          <Text>No padding</Text>
        </Container>
      );
      expect(getByText('No padding')).toBeTruthy();
    });

    it('should have sm padding', () => {
      const { getByText } = render(
        <Container padding="sm">
          <Text>Small padding</Text>
        </Container>
      );
      expect(getByText('Small padding')).toBeTruthy();
    });

    it('should have lg padding', () => {
      const { getByText } = render(
        <Container padding="lg">
          <Text>Large padding</Text>
        </Container>
      );
      expect(getByText('Large padding')).toBeTruthy();
    });
  });

  describe('center', () => {
    it('should not be centered by default', () => {
      const { getByText } = render(
        <Container>
          <Text>Not centered</Text>
        </Container>
      );
      expect(getByText('Not centered')).toBeTruthy();
    });

    it('should be centered when center=true', () => {
      const { getByText } = render(
        <Container center>
          <Text>Centered content</Text>
        </Container>
      );
      expect(getByText('Centered content')).toBeTruthy();
    });

    it('should be centered with scroll', () => {
      const { getByText } = render(
        <Container center scroll>
          <Text>Centered scrollable</Text>
        </Container>
      );
      expect(getByText('Centered scrollable')).toBeTruthy();
    });
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { getByText } = render(
        <Container className="custom-class">
          <Text>Custom</Text>
        </Container>
      );
      expect(getByText('Custom')).toBeTruthy();
    });
  });

  describe('combined props', () => {
    it('should work with all props combined', () => {
      const { getByText } = render(
        <Container safe scroll keyboard padding="lg" center>
          <Text>All props</Text>
        </Container>
      );
      expect(getByText('All props')).toBeTruthy();
    });
  });
});

describe('Screen', () => {
  describe('rendering', () => {
    it('should render children', () => {
      const { getByText } = render(
        <Screen>
          <Text>Screen content</Text>
        </Screen>
      );
      expect(getByText('Screen content')).toBeTruthy();
    });
  });

  describe('header and footer', () => {
    it('should render with header', () => {
      const { getByText } = render(
        <Screen header={<Text>Header</Text>}>
          <Text>Content</Text>
        </Screen>
      );
      expect(getByText('Header')).toBeTruthy();
      expect(getByText('Content')).toBeTruthy();
    });

    it('should render with footer', () => {
      const { getByText } = render(
        <Screen footer={<Text>Footer</Text>}>
          <Text>Content</Text>
        </Screen>
      );
      expect(getByText('Footer')).toBeTruthy();
      expect(getByText('Content')).toBeTruthy();
    });

    it('should render with both header and footer', () => {
      const { getByText } = render(
        <Screen
          header={<Text>Header</Text>}
          footer={<Text>Footer</Text>}
        >
          <Text>Content</Text>
        </Screen>
      );
      expect(getByText('Header')).toBeTruthy();
      expect(getByText('Content')).toBeTruthy();
      expect(getByText('Footer')).toBeTruthy();
    });
  });

  describe('default props', () => {
    it('should have scroll enabled by default', () => {
      const { getByText } = render(
        <Screen>
          <Text>Scrollable by default</Text>
        </Screen>
      );
      expect(getByText('Scrollable by default')).toBeTruthy();
    });

    it('should have keyboard avoiding enabled by default', () => {
      const { getByText } = render(
        <Screen>
          <Text>Keyboard avoiding by default</Text>
        </Screen>
      );
      expect(getByText('Keyboard avoiding by default')).toBeTruthy();
    });
  });

  describe('custom props', () => {
    it('should accept custom padding', () => {
      const { getByText } = render(
        <Screen padding="lg">
          <Text>Large padding</Text>
        </Screen>
      );
      expect(getByText('Large padding')).toBeTruthy();
    });

    it('should disable scroll', () => {
      const { getByText } = render(
        <Screen scroll={false}>
          <Text>No scroll</Text>
        </Screen>
      );
      expect(getByText('No scroll')).toBeTruthy();
    });
  });
});
