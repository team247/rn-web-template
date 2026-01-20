import { forwardRef, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    containerStyle,
    inputStyle,
    labelStyle,
    className = '',
    inputClassName = '',
    disabled = false,
    secureTextEntry,
    ...props
  },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const hasError = !!error;
  const isPassword = secureTextEntry !== undefined;

  const containerClasses = [
    'mb-4',
    className,
  ].filter(Boolean).join(' ');

  const inputContainerClasses = [
    'flex-row items-center',
    'border rounded-lg px-3',
    'bg-white',
    isFocused && !hasError && 'border-primary-500',
    hasError && 'border-error-500',
    !isFocused && !hasError && 'border-secondary-300',
    disabled && 'bg-secondary-100 opacity-60',
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'flex-1 py-3',
    'text-base text-secondary-900',
    leftIcon ? 'pl-2' : '',
    (rightIcon || isPassword) ? 'pr-2' : '',
    inputClassName,
  ].filter(Boolean).join(' ');

  return (
    <View className={containerClasses} style={containerStyle}>
      {label && (
        <Text
          className="text-sm font-medium text-secondary-700 mb-1.5"
          style={labelStyle}
        >
          {label}
        </Text>
      )}

      <View className={inputContainerClasses}>
        {leftIcon && <View className="mr-2">{leftIcon}</View>}

        <TextInput
          ref={ref}
          className={inputClasses}
          style={inputStyle}
          placeholderTextColor="#94a3b8"
          editable={!disabled}
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            className="p-1"
          >
            <Text className="text-secondary-500 text-sm">
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}

        {rightIcon && !isPassword && <View className="ml-2">{rightIcon}</View>}
      </View>

      {(error || hint) && (
        <Text
          className={`text-sm mt-1 ${hasError ? 'text-error-500' : 'text-secondary-500'}`}
        >
          {error || hint}
        </Text>
      )}
    </View>
  );
});
