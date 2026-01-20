import {
  View,
  TouchableOpacity,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type { ReactNode } from 'react';

interface CardProps extends Omit<ViewProps, 'style'> {
  children: ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

const variantStyles: Record<string, string> = {
  elevated: 'bg-white shadow-md',
  outlined: 'bg-white border border-secondary-200',
  filled: 'bg-secondary-50',
};

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({
  children,
  variant = 'elevated',
  padding = 'md',
  onPress,
  style,
  className = '',
  ...props
}: CardProps) {
  const cardClasses = [
    'rounded-xl overflow-hidden',
    variantStyles[variant],
    paddingStyles[padding],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (onPress) {
    return (
      <TouchableOpacity
        className={cardClasses}
        style={style}
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={cardClasses} style={style} {...props}>
      {children}
    </View>
  );
}

// Card sub-components
interface CardSectionProps extends Omit<ViewProps, 'style'> {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function CardHeader({ children, style, className = '', ...props }: CardSectionProps) {
  return (
    <View
      className={`border-b border-secondary-100 pb-3 mb-3 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardContent({ children, style, className = '', ...props }: CardSectionProps) {
  return (
    <View className={className} style={style} {...props}>
      {children}
    </View>
  );
}

export function CardFooter({ children, style, className = '', ...props }: CardSectionProps) {
  return (
    <View
      className={`border-t border-secondary-100 pt-3 mt-3 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}
