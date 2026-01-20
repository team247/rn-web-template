import { View, Text, type ViewProps, type StyleProp, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends Omit<ViewProps, 'style'> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { container: string; text: string }> = {
  default: {
    container: 'bg-secondary-100',
    text: 'text-secondary-700',
  },
  primary: {
    container: 'bg-primary-100',
    text: 'text-primary-700',
  },
  success: {
    container: 'bg-green-100',
    text: 'text-green-700',
  },
  warning: {
    container: 'bg-yellow-100',
    text: 'text-yellow-700',
  },
  error: {
    container: 'bg-red-100',
    text: 'text-red-700',
  },
};

const sizeStyles: Record<BadgeSize, { container: string; text: string; dot: string }> = {
  sm: {
    container: 'px-1.5 py-0.5 rounded',
    text: 'text-xs',
    dot: 'w-1.5 h-1.5',
  },
  md: {
    container: 'px-2 py-1 rounded-md',
    text: 'text-sm',
    dot: 'w-2 h-2',
  },
  lg: {
    container: 'px-3 py-1.5 rounded-lg',
    text: 'text-base',
    dot: 'w-2.5 h-2.5',
  },
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-secondary-500',
  primary: 'bg-primary-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  style,
  className = '',
  ...props
}: BadgeProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const containerClasses = [
    'flex-row items-center self-start',
    variantStyle.container,
    sizeStyle.container,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'font-medium',
    variantStyle.text,
    sizeStyle.text,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <View className={containerClasses} style={style} {...props}>
      {dot && (
        <View
          className={`rounded-full mr-1.5 ${dotColors[variant]} ${sizeStyle.dot}`}
        />
      )}
      <Text className={textClasses}>{children}</Text>
    </View>
  );
}
