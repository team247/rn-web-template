import {
  Text as RNText,
  type TextProps as RNTextProps,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import type { ReactNode } from 'react';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'label';

type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

interface TextProps extends Omit<RNTextProps, 'style'> {
  children: ReactNode;
  variant?: TextVariant;
  weight?: TextWeight;
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'white';
  align?: 'left' | 'center' | 'right';
  style?: StyleProp<TextStyle>;
  className?: string;
}

const variantStyles: Record<TextVariant, string> = {
  h1: 'text-3xl leading-10',
  h2: 'text-2xl leading-8',
  h3: 'text-xl leading-7',
  h4: 'text-lg leading-6',
  body: 'text-base leading-6',
  'body-sm': 'text-sm leading-5',
  caption: 'text-xs leading-4',
  label: 'text-sm leading-5 uppercase tracking-wide',
};

const weightStyles: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorStyles: Record<string, string> = {
  primary: 'text-secondary-900',
  secondary: 'text-secondary-700',
  muted: 'text-secondary-500',
  error: 'text-error-500',
  success: 'text-success-500',
  white: 'text-white',
};

const alignStyles: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// Default weights for each variant
const defaultWeights: Record<TextVariant, TextWeight> = {
  h1: 'bold',
  h2: 'bold',
  h3: 'semibold',
  h4: 'semibold',
  body: 'normal',
  'body-sm': 'normal',
  caption: 'normal',
  label: 'medium',
};

export function Text({
  children,
  variant = 'body',
  weight,
  color = 'primary',
  align = 'left',
  style,
  className = '',
  ...props
}: TextProps) {
  const resolvedWeight = weight ?? defaultWeights[variant];

  const textClasses = [
    variantStyles[variant],
    weightStyles[resolvedWeight],
    colorStyles[color],
    alignStyles[align],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <RNText className={textClasses} style={style} {...props}>
      {children}
    </RNText>
  );
}

// Heading shortcuts
export function H1(props: Omit<TextProps, 'variant'>) {
  return <Text variant="h1" {...props} />;
}

export function H2(props: Omit<TextProps, 'variant'>) {
  return <Text variant="h2" {...props} />;
}

export function H3(props: Omit<TextProps, 'variant'>) {
  return <Text variant="h3" {...props} />;
}

export function H4(props: Omit<TextProps, 'variant'>) {
  return <Text variant="h4" {...props} />;
}

export function Caption(props: Omit<TextProps, 'variant'>) {
  return <Text variant="caption" color="muted" {...props} />;
}
