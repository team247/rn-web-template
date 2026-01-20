import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type TouchableOpacityProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  className?: string;
  textClassName?: string;
}

const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: 'bg-primary-600 active:bg-primary-700',
    text: 'text-white',
  },
  secondary: {
    container: 'bg-secondary-100 active:bg-secondary-200',
    text: 'text-secondary-900',
  },
  outline: {
    container: 'bg-transparent border border-primary-600 active:bg-primary-50',
    text: 'text-primary-600',
  },
  ghost: {
    container: 'bg-transparent active:bg-secondary-100',
    text: 'text-secondary-700',
  },
  danger: {
    container: 'bg-error-500 active:bg-error-600',
    text: 'text-white',
  },
};

const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
  sm: {
    container: 'px-3 py-1.5 rounded-md',
    text: 'text-sm',
  },
  md: {
    container: 'px-4 py-2.5 rounded-lg',
    text: 'text-base',
  },
  lg: {
    container: 'px-6 py-3.5 rounded-xl',
    text: 'text-lg',
  },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  className = '',
  textClassName = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const containerClasses = [
    'flex-row items-center justify-center',
    variantStyle.container,
    sizeStyle.container,
    fullWidth && 'w-full',
    isDisabled && 'opacity-50',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'font-semibold',
    variantStyle.text,
    sizeStyle.text,
    textClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <TouchableOpacity
      className={containerClasses}
      style={style}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? '#fff' : '#3b82f6'}
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            className={textClasses}
            style={[leftIcon ? { marginLeft: 8 } : undefined, textStyle]}
          >
            {children}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}
