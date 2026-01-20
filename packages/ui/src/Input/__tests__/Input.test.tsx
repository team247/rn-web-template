import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Input } from '../Input';

describe('Input', () => {
  describe('rendering', () => {
    it('should render basic input', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Enter text" />
      );
      expect(getByPlaceholderText('Enter text')).toBeTruthy();
    });

    it('should render with label', () => {
      const { getByText } = render(
        <Input label="Email" placeholder="Enter email" />
      );
      expect(getByText('Email')).toBeTruthy();
    });

    it('should render with hint', () => {
      const { getByText } = render(
        <Input hint="This is a hint" placeholder="Enter text" />
      );
      expect(getByText('This is a hint')).toBeTruthy();
    });

    it('should render with error', () => {
      const { getByText } = render(
        <Input error="This field is required" placeholder="Enter text" />
      );
      expect(getByText('This field is required')).toBeTruthy();
    });

    it('should prioritize error over hint', () => {
      const { getByText, queryByText } = render(
        <Input
          error="Error message"
          hint="Hint message"
          placeholder="Enter text"
        />
      );
      expect(getByText('Error message')).toBeTruthy();
      expect(queryByText('Hint message')).toBeNull();
    });
  });

  describe('icons', () => {
    it('should render with left icon', () => {
      const { getByText } = render(
        <Input
          leftIcon={<Text>🔍</Text>}
          placeholder="Search"
        />
      );
      expect(getByText('🔍')).toBeTruthy();
    });

    it('should render with right icon', () => {
      const { getByText } = render(
        <Input
          rightIcon={<Text>✓</Text>}
          placeholder="Enter text"
        />
      );
      expect(getByText('✓')).toBeTruthy();
    });
  });

  describe('password input', () => {
    it('should show/hide password toggle for secure input', () => {
      const { getByText } = render(
        <Input secureTextEntry placeholder="Password" />
      );
      expect(getByText('Show')).toBeTruthy();
    });

    it('should toggle password visibility', () => {
      const { getByText } = render(
        <Input secureTextEntry placeholder="Password" />
      );

      const toggleButton = getByText('Show');
      fireEvent.press(toggleButton);
      expect(getByText('Hide')).toBeTruthy();

      fireEvent.press(getByText('Hide'));
      expect(getByText('Show')).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('should render disabled input', () => {
      const { getByPlaceholderText } = render(
        <Input disabled placeholder="Disabled input" />
      );
      const input = getByPlaceholderText('Disabled input');
      expect(input.props.editable).toBe(false);
    });
  });

  describe('focus handling', () => {
    it('should call onFocus when focused', () => {
      const onFocus = jest.fn();
      const { getByPlaceholderText } = render(
        <Input onFocus={onFocus} placeholder="Enter text" />
      );

      fireEvent(getByPlaceholderText('Enter text'), 'focus');
      expect(onFocus).toHaveBeenCalled();
    });

    it('should call onBlur when blurred', () => {
      const onBlur = jest.fn();
      const { getByPlaceholderText } = render(
        <Input onBlur={onBlur} placeholder="Enter text" />
      );

      fireEvent(getByPlaceholderText('Enter text'), 'blur');
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('text input', () => {
    it('should call onChangeText when text changes', () => {
      const onChangeText = jest.fn();
      const { getByPlaceholderText } = render(
        <Input onChangeText={onChangeText} placeholder="Enter text" />
      );

      fireEvent.changeText(getByPlaceholderText('Enter text'), 'Hello');
      expect(onChangeText).toHaveBeenCalledWith('Hello');
    });

    it('should display value', () => {
      const { getByDisplayValue } = render(
        <Input value="Test value" placeholder="Enter text" />
      );
      expect(getByDisplayValue('Test value')).toBeTruthy();
    });
  });

  describe('keyboard type', () => {
    it('should accept email keyboard type', () => {
      const { getByPlaceholderText } = render(
        <Input keyboardType="email-address" placeholder="Enter email" />
      );
      const input = getByPlaceholderText('Enter email');
      expect(input.props.keyboardType).toBe('email-address');
    });

    it('should accept numeric keyboard type', () => {
      const { getByPlaceholderText } = render(
        <Input keyboardType="numeric" placeholder="Enter number" />
      );
      const input = getByPlaceholderText('Enter number');
      expect(input.props.keyboardType).toBe('numeric');
    });
  });
});
