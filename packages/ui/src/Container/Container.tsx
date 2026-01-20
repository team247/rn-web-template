import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type { ReactNode } from 'react';

interface ContainerProps extends Omit<ViewProps, 'style'> {
  children: ReactNode;
  safe?: boolean;
  scroll?: boolean;
  keyboard?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

export function Container({
  children,
  safe = true,
  scroll = false,
  keyboard = false,
  padding = 'md',
  center = false,
  style,
  className = '',
  ...props
}: ContainerProps) {
  const containerClasses = [
    'flex-1 bg-white',
    paddingStyles[padding],
    center && 'items-center justify-center',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  let content: ReactNode = (
    <View className={containerClasses} style={style} {...props}>
      {children}
    </View>
  );

  // Wrap with ScrollView if needed
  if (scroll) {
    content = (
      <ScrollView
        className={containerClasses}
        style={style}
        contentContainerStyle={center ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center' } : undefined}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...props}
      >
        {children}
      </ScrollView>
    );
  }

  // Wrap with KeyboardAvoidingView if needed
  if (keyboard) {
    content = (
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  // Wrap with SafeAreaView if needed
  if (safe) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        {content}
      </SafeAreaView>
    );
  }

  return <>{content}</>;
}

// Simple screen wrapper with common defaults
interface ScreenProps extends ContainerProps {
  header?: ReactNode;
  footer?: ReactNode;
}

export function Screen({
  children,
  header,
  footer,
  safe = true,
  scroll = true,
  keyboard = true,
  padding = 'md',
  ...props
}: ScreenProps) {
  return (
    <Container safe={safe} keyboard={keyboard} scroll={false} padding="none" {...props}>
      {header}
      <Container safe={false} scroll={scroll} padding={padding} className="flex-1">
        {children}
      </Container>
      {footer}
    </Container>
  );
}
