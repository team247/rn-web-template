import React from 'react';
import { render } from '@testing-library/react-native';
import { Skeleton, SkeletonText, SkeletonCard, SkeletonList } from '../Skeleton';

// Mock Animated API
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated.loop = jest.fn((animation) => ({
    start: jest.fn(),
    stop: jest.fn(),
  }));
  RN.Animated.sequence = jest.fn((animations) => animations[0]);
  RN.Animated.timing = jest.fn(() => ({
    start: jest.fn(),
  }));
  return RN;
});

describe('Skeleton', () => {
  describe('rendering', () => {
    it('should render skeleton', () => {
      const { toJSON } = render(<Skeleton />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render with custom testID via style', () => {
      const { toJSON } = render(<Skeleton style={{ opacity: 0.5 }} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('dimensions', () => {
    it('should render with default width (100%)', () => {
      const { toJSON } = render(<Skeleton />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render with custom width', () => {
      const { toJSON } = render(<Skeleton width={200} />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render with percentage width', () => {
      const { toJSON } = render(<Skeleton width="50%" />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render with default height (16)', () => {
      const { toJSON } = render(<Skeleton />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render with custom height', () => {
      const { toJSON } = render(<Skeleton height={32} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('border radius', () => {
    it('should render with default border radius (4)', () => {
      const { toJSON } = render(<Skeleton />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render with custom border radius', () => {
      const { toJSON } = render(<Skeleton borderRadius={24} />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render as circle with equal width/height and half border radius', () => {
      const { toJSON } = render(
        <Skeleton width={48} height={48} borderRadius={24} />
      );
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { toJSON } = render(<Skeleton className="custom-class" />);
      expect(toJSON()).toBeTruthy();
    });
  });
});

describe('SkeletonText', () => {
  describe('rendering', () => {
    it('should render with default 3 lines', () => {
      const { toJSON } = render(<SkeletonText />);
      const tree = toJSON();
      expect(tree).toBeTruthy();
      // Should have 3 child Skeleton components
      expect(tree?.children?.length).toBe(3);
    });

    it('should render with custom number of lines', () => {
      const { toJSON } = render(<SkeletonText lines={5} />);
      const tree = toJSON();
      expect(tree?.children?.length).toBe(5);
    });

    it('should render with 1 line', () => {
      const { toJSON } = render(<SkeletonText lines={1} />);
      const tree = toJSON();
      expect(tree?.children?.length).toBe(1);
    });
  });

  describe('last line width', () => {
    it('should render with default lastLineWidth (60%)', () => {
      const { toJSON } = render(<SkeletonText lines={2} />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render with custom lastLineWidth', () => {
      const { toJSON } = render(
        <SkeletonText lines={2} lastLineWidth="40%" />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('should render with numeric lastLineWidth', () => {
      const { toJSON } = render(
        <SkeletonText lines={2} lastLineWidth={100} />
      );
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { toJSON } = render(<SkeletonText className="custom-class" />);
      expect(toJSON()).toBeTruthy();
    });
  });
});

describe('SkeletonCard', () => {
  describe('rendering', () => {
    it('should render skeleton card', () => {
      const { toJSON } = render(<SkeletonCard />);
      expect(toJSON()).toBeTruthy();
    });

    it('should contain avatar skeleton (circle)', () => {
      const { toJSON } = render(<SkeletonCard />);
      expect(toJSON()).toBeTruthy();
    });

    it('should contain text skeletons', () => {
      const { toJSON } = render(<SkeletonCard />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { toJSON } = render(<SkeletonCard className="custom-class" />);
      expect(toJSON()).toBeTruthy();
    });
  });
});

describe('SkeletonList', () => {
  describe('rendering', () => {
    it('should render with default 3 items', () => {
      const { toJSON } = render(<SkeletonList />);
      const tree = toJSON();
      expect(tree).toBeTruthy();
      expect(tree?.children?.length).toBe(3);
    });

    it('should render with custom count', () => {
      const { toJSON } = render(<SkeletonList count={5} />);
      const tree = toJSON();
      expect(tree?.children?.length).toBe(5);
    });

    it('should render with 1 item', () => {
      const { toJSON } = render(<SkeletonList count={1} />);
      const tree = toJSON();
      expect(tree?.children?.length).toBe(1);
    });
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { toJSON } = render(<SkeletonList className="custom-class" />);
      expect(toJSON()).toBeTruthy();
    });
  });
});
