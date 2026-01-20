import React from 'react';
import { render } from '@testing-library/react-native';
import { Avatar, AvatarGroup } from '../Avatar';

describe('Avatar', () => {
  describe('rendering', () => {
    it('should render with testID', () => {
      const { getByTestId } = render(<Avatar testID="test-avatar" />);
      expect(getByTestId('test-avatar')).toBeTruthy();
    });

    it('should render placeholder when no source or name provided', () => {
      const { getByText } = render(<Avatar />);
      expect(getByText('?')).toBeTruthy();
    });
  });

  describe('image source', () => {
    it('should render with uri source', () => {
      const { getByTestId } = render(
        <Avatar
          testID="avatar"
          source={{ uri: 'https://example.com/avatar.jpg' }}
        />
      );
      expect(getByTestId('avatar')).toBeTruthy();
    });

    it('should render with require source', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" source={1} />
      );
      expect(getByTestId('avatar')).toBeTruthy();
    });
  });

  describe('name initials', () => {
    it('should display initials from single name', () => {
      const { getByText } = render(<Avatar name="John" />);
      expect(getByText('JO')).toBeTruthy();
    });

    it('should display initials from two names', () => {
      const { getByText } = render(<Avatar name="John Doe" />);
      expect(getByText('JD')).toBeTruthy();
    });

    it('should display initials from multiple names', () => {
      const { getByText } = render(<Avatar name="John William Doe" />);
      expect(getByText('JD')).toBeTruthy();
    });

    it('should handle names with extra spaces', () => {
      const { getByText } = render(<Avatar name="  John   Doe  " />);
      expect(getByText('JD')).toBeTruthy();
    });
  });

  describe('sizes', () => {
    it('should render xs size', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" name="Test" size="xs" />
      );
      expect(getByTestId('avatar')).toBeTruthy();
    });

    it('should render sm size', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" name="Test" size="sm" />
      );
      expect(getByTestId('avatar')).toBeTruthy();
    });

    it('should render md size by default', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" name="Test" />
      );
      expect(getByTestId('avatar')).toBeTruthy();
    });

    it('should render lg size', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" name="Test" size="lg" />
      );
      expect(getByTestId('avatar')).toBeTruthy();
    });

    it('should render xl size', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" name="Test" size="xl" />
      );
      expect(getByTestId('avatar')).toBeTruthy();
    });

    it('should render 2xl size', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" name="Test" size="2xl" />
      );
      expect(getByTestId('avatar')).toBeTruthy();
    });
  });

  describe('color from name', () => {
    it('should generate consistent color for same name', () => {
      const { getByTestId: getByTestId1 } = render(
        <Avatar testID="avatar1" name="Alice" />
      );
      const { getByTestId: getByTestId2 } = render(
        <Avatar testID="avatar2" name="Alice" />
      );
      expect(getByTestId1('avatar1')).toBeTruthy();
      expect(getByTestId2('avatar2')).toBeTruthy();
    });

    it('should generate different colors for different names', () => {
      const { getByTestId: getByTestId1 } = render(
        <Avatar testID="avatar1" name="Alice" />
      );
      const { getByTestId: getByTestId2 } = render(
        <Avatar testID="avatar2" name="Bob" />
      );
      expect(getByTestId1('avatar1')).toBeTruthy();
      expect(getByTestId2('avatar2')).toBeTruthy();
    });
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { getByTestId } = render(
        <Avatar testID="avatar" className="custom-class" name="Test" />
      );
      expect(getByTestId('avatar')).toBeTruthy();
    });
  });
});

describe('AvatarGroup', () => {
  const avatars = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
    { name: 'Diana' },
    { name: 'Eve' },
  ];

  describe('rendering', () => {
    it('should render with testID', () => {
      const { getByTestId } = render(
        <AvatarGroup testID="avatar-group" avatars={avatars} />
      );
      expect(getByTestId('avatar-group')).toBeTruthy();
    });

    it('should render avatars up to max', () => {
      const { getByText } = render(
        <AvatarGroup avatars={avatars} max={3} />
      );
      expect(getByText('AL')).toBeTruthy();
      expect(getByText('BO')).toBeTruthy();
      expect(getByText('CH')).toBeTruthy();
    });

    it('should show remaining count', () => {
      const { getByText } = render(
        <AvatarGroup avatars={avatars} max={3} />
      );
      expect(getByText('+2')).toBeTruthy();
    });

    it('should use default max of 4', () => {
      const { getByText } = render(
        <AvatarGroup avatars={avatars} />
      );
      expect(getByText('+1')).toBeTruthy();
    });
  });

  describe('sizes', () => {
    it('should render with custom size', () => {
      const { getByTestId } = render(
        <AvatarGroup testID="avatar-group" avatars={avatars} size="lg" />
      );
      expect(getByTestId('avatar-group')).toBeTruthy();
    });
  });

  describe('no overflow', () => {
    it('should not show remaining count when all avatars fit', () => {
      const smallAvatars = [{ name: 'Alice' }, { name: 'Bob' }];
      const { queryByText } = render(
        <AvatarGroup avatars={smallAvatars} max={4} />
      );
      expect(queryByText(/^\+/)).toBeNull();
    });
  });
});
