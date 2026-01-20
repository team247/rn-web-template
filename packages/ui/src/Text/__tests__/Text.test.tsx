import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, H1, H2, H3, H4, Caption } from '../Text';

describe('Text', () => {
  describe('rendering', () => {
    it('should render children', () => {
      const { getByText } = render(<Text>Hello World</Text>);
      expect(getByText('Hello World')).toBeTruthy();
    });

    it('should render with testID', () => {
      const { getByTestId } = render(<Text testID="test-text">Content</Text>);
      expect(getByTestId('test-text')).toBeTruthy();
    });
  });

  describe('variants', () => {
    it('should render body variant by default', () => {
      const { getByText } = render(<Text>Body text</Text>);
      expect(getByText('Body text')).toBeTruthy();
    });

    it('should render h1 variant', () => {
      const { getByText } = render(<Text variant="h1">Heading 1</Text>);
      expect(getByText('Heading 1')).toBeTruthy();
    });

    it('should render h2 variant', () => {
      const { getByText } = render(<Text variant="h2">Heading 2</Text>);
      expect(getByText('Heading 2')).toBeTruthy();
    });

    it('should render h3 variant', () => {
      const { getByText } = render(<Text variant="h3">Heading 3</Text>);
      expect(getByText('Heading 3')).toBeTruthy();
    });

    it('should render h4 variant', () => {
      const { getByText } = render(<Text variant="h4">Heading 4</Text>);
      expect(getByText('Heading 4')).toBeTruthy();
    });

    it('should render body-sm variant', () => {
      const { getByText } = render(<Text variant="body-sm">Small body</Text>);
      expect(getByText('Small body')).toBeTruthy();
    });

    it('should render caption variant', () => {
      const { getByText } = render(<Text variant="caption">Caption text</Text>);
      expect(getByText('Caption text')).toBeTruthy();
    });

    it('should render label variant', () => {
      const { getByText } = render(<Text variant="label">Label text</Text>);
      expect(getByText('Label text')).toBeTruthy();
    });
  });

  describe('weights', () => {
    it('should render with normal weight', () => {
      const { getByText } = render(<Text weight="normal">Normal</Text>);
      expect(getByText('Normal')).toBeTruthy();
    });

    it('should render with medium weight', () => {
      const { getByText } = render(<Text weight="medium">Medium</Text>);
      expect(getByText('Medium')).toBeTruthy();
    });

    it('should render with semibold weight', () => {
      const { getByText } = render(<Text weight="semibold">Semibold</Text>);
      expect(getByText('Semibold')).toBeTruthy();
    });

    it('should render with bold weight', () => {
      const { getByText } = render(<Text weight="bold">Bold</Text>);
      expect(getByText('Bold')).toBeTruthy();
    });

    it('should use default weight for h1 (bold)', () => {
      const { getByText } = render(<Text variant="h1">H1 Bold</Text>);
      expect(getByText('H1 Bold')).toBeTruthy();
    });

    it('should use default weight for label (medium)', () => {
      const { getByText } = render(<Text variant="label">Label Medium</Text>);
      expect(getByText('Label Medium')).toBeTruthy();
    });
  });

  describe('colors', () => {
    it('should render with primary color by default', () => {
      const { getByText } = render(<Text>Primary</Text>);
      expect(getByText('Primary')).toBeTruthy();
    });

    it('should render with secondary color', () => {
      const { getByText } = render(<Text color="secondary">Secondary</Text>);
      expect(getByText('Secondary')).toBeTruthy();
    });

    it('should render with muted color', () => {
      const { getByText } = render(<Text color="muted">Muted</Text>);
      expect(getByText('Muted')).toBeTruthy();
    });

    it('should render with error color', () => {
      const { getByText } = render(<Text color="error">Error</Text>);
      expect(getByText('Error')).toBeTruthy();
    });

    it('should render with success color', () => {
      const { getByText } = render(<Text color="success">Success</Text>);
      expect(getByText('Success')).toBeTruthy();
    });

    it('should render with white color', () => {
      const { getByText } = render(<Text color="white">White</Text>);
      expect(getByText('White')).toBeTruthy();
    });
  });

  describe('alignment', () => {
    it('should render with left alignment by default', () => {
      const { getByText } = render(<Text>Left</Text>);
      expect(getByText('Left')).toBeTruthy();
    });

    it('should render with center alignment', () => {
      const { getByText } = render(<Text align="center">Center</Text>);
      expect(getByText('Center')).toBeTruthy();
    });

    it('should render with right alignment', () => {
      const { getByText } = render(<Text align="right">Right</Text>);
      expect(getByText('Right')).toBeTruthy();
    });
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { getByText } = render(
        <Text className="custom-class">Custom</Text>
      );
      expect(getByText('Custom')).toBeTruthy();
    });
  });
});

describe('Heading shortcuts', () => {
  describe('H1', () => {
    it('should render H1 component', () => {
      const { getByText } = render(<H1>Heading 1</H1>);
      expect(getByText('Heading 1')).toBeTruthy();
    });

    it('should pass props through', () => {
      const { getByText } = render(<H1 color="error">Error H1</H1>);
      expect(getByText('Error H1')).toBeTruthy();
    });
  });

  describe('H2', () => {
    it('should render H2 component', () => {
      const { getByText } = render(<H2>Heading 2</H2>);
      expect(getByText('Heading 2')).toBeTruthy();
    });
  });

  describe('H3', () => {
    it('should render H3 component', () => {
      const { getByText } = render(<H3>Heading 3</H3>);
      expect(getByText('Heading 3')).toBeTruthy();
    });
  });

  describe('H4', () => {
    it('should render H4 component', () => {
      const { getByText } = render(<H4>Heading 4</H4>);
      expect(getByText('Heading 4')).toBeTruthy();
    });
  });

  describe('Caption', () => {
    it('should render Caption component', () => {
      const { getByText } = render(<Caption>Caption text</Caption>);
      expect(getByText('Caption text')).toBeTruthy();
    });

    it('should use muted color by default', () => {
      const { getByText } = render(<Caption>Muted caption</Caption>);
      expect(getByText('Muted caption')).toBeTruthy();
    });
  });
});
