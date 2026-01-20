import { useEffect, useRef } from 'react';
import { View, Animated, type ViewStyle, type StyleProp } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Skeleton loading placeholder component with shimmer animation
 *
 * @example
 * // Basic usage
 * <Skeleton width={200} height={20} />
 *
 * // Circle skeleton (for avatars)
 * <Skeleton width={48} height={48} borderRadius={24} />
 *
 * // Full width
 * <Skeleton width="100%" height={16} />
 */
export function Skeleton({
  width = '100%',
  height = 16,
  borderRadius = 4,
  className = '',
  style,
}: SkeletonProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      className={`bg-secondary-200 ${className}`}
      style={[
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: string | number;
  className?: string;
}

/**
 * Skeleton for text content with multiple lines
 *
 * @example
 * <SkeletonText lines={3} />
 */
export function SkeletonText({
  lines = 3,
  lastLineWidth = '60%',
  className = '',
}: SkeletonTextProps) {
  return (
    <View className={`gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          width={index === lines - 1 ? lastLineWidth : '100%'}
          height={14}
        />
      ))}
    </View>
  );
}

/**
 * Skeleton for card content
 *
 * @example
 * <SkeletonCard />
 */
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <View className={`bg-white rounded-xl p-4 shadow-sm ${className}`}>
      <View className="flex-row items-center mb-4">
        <Skeleton width={48} height={48} borderRadius={24} />
        <View className="ml-3 flex-1">
          <Skeleton width="60%" height={16} className="mb-2" />
          <Skeleton width="40%" height={12} />
        </View>
      </View>
      <SkeletonText lines={2} />
    </View>
  );
}

/**
 * Skeleton for list items
 *
 * @example
 * <SkeletonList count={5} />
 */
export function SkeletonList({
  count = 3,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  return (
    <View className={`gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} className="flex-row items-center">
          <Skeleton width={40} height={40} borderRadius={8} />
          <View className="ml-3 flex-1">
            <Skeleton width="70%" height={14} className="mb-2" />
            <Skeleton width="50%" height={12} />
          </View>
        </View>
      ))}
    </View>
  );
}
