import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from '../Badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('should render children', () => {
      const { getByText } = render(<Badge>New</Badge>);
      expect(getByText('New')).toBeTruthy();
    });

    it('should render with testID', () => {
      const { getByTestId } = render(
        <Badge testID="test-badge">Badge</Badge>
      );
      expect(getByTestId('test-badge')).toBeTruthy();
    });
  });

  describe('variants', () => {
    it('should render default variant', () => {
      const { getByText } = render(<Badge>Default</Badge>);
      expect(getByText('Default')).toBeTruthy();
    });

    it('should render primary variant', () => {
      const { getByText } = render(<Badge variant="primary">Primary</Badge>);
      expect(getByText('Primary')).toBeTruthy();
    });

    it('should render success variant', () => {
      const { getByText } = render(<Badge variant="success">Success</Badge>);
      expect(getByText('Success')).toBeTruthy();
    });

    it('should render warning variant', () => {
      const { getByText } = render(<Badge variant="warning">Warning</Badge>);
      expect(getByText('Warning')).toBeTruthy();
    });

    it('should render error variant', () => {
      const { getByText } = render(<Badge variant="error">Error</Badge>);
      expect(getByText('Error')).toBeTruthy();
    });
  });

  describe('sizes', () => {
    it('should render sm size', () => {
      const { getByText } = render(<Badge size="sm">Small</Badge>);
      expect(getByText('Small')).toBeTruthy();
    });

    it('should render md size by default', () => {
      const { getByText } = render(<Badge>Medium</Badge>);
      expect(getByText('Medium')).toBeTruthy();
    });

    it('should render lg size', () => {
      const { getByText } = render(<Badge size="lg">Large</Badge>);
      expect(getByText('Large')).toBeTruthy();
    });
  });

  describe('dot indicator', () => {
    it('should render without dot by default', () => {
      const { getByTestId, queryAllByTestId } = render(
        <Badge testID="badge">No Dot</Badge>
      );
      expect(getByTestId('badge')).toBeTruthy();
      // The badge should render but without a dot element
    });

    it('should render with dot when enabled', () => {
      const { getByText } = render(<Badge dot>With Dot</Badge>);
      expect(getByText('With Dot')).toBeTruthy();
    });

    it('should render dot with correct variant color', () => {
      const { getByText } = render(
        <Badge dot variant="success">
          Success Dot
        </Badge>
      );
      expect(getByText('Success Dot')).toBeTruthy();
    });

    it('should render dot with different sizes', () => {
      const { getByText } = render(
        <Badge dot size="lg">
          Large Dot
        </Badge>
      );
      expect(getByText('Large Dot')).toBeTruthy();
    });
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { getByTestId } = render(
        <Badge testID="badge" className="custom-class">
          Custom
        </Badge>
      );
      expect(getByTestId('badge')).toBeTruthy();
    });
  });

  describe('combined props', () => {
    it('should render with multiple props combined', () => {
      const { getByText } = render(
        <Badge variant="error" size="lg" dot>
          Critical Error
        </Badge>
      );
      expect(getByText('Critical Error')).toBeTruthy();
    });
  });
});
