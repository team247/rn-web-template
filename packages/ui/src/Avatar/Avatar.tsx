import { View, Image, Text, type ViewProps, type StyleProp, type ViewStyle } from 'react-native';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface AvatarProps extends Omit<ViewProps, 'style'> {
  source?: { uri: string } | number;
  name?: string;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; size: number }> = {
  xs: { container: 'w-6 h-6', text: 'text-xs', size: 24 },
  sm: { container: 'w-8 h-8', text: 'text-sm', size: 32 },
  md: { container: 'w-10 h-10', text: 'text-base', size: 40 },
  lg: { container: 'w-12 h-12', text: 'text-lg', size: 48 },
  xl: { container: 'w-16 h-16', text: 'text-xl', size: 64 },
  '2xl': { container: 'w-24 h-24', text: 'text-3xl', size: 96 },
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0]?.substring(0, 2).toUpperCase() ?? '';
  }
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
};

const getColorFromName = (name: string): string => {
  const colors = [
    'bg-primary-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-cyan-500',
    'bg-teal-500',
    'bg-green-500',
    'bg-orange-500',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index] ?? 'bg-primary-500';
};

export function Avatar({
  source,
  name,
  size = 'md',
  style,
  className = '',
  ...props
}: AvatarProps) {
  const sizeStyle = sizeStyles[size];
  const hasImage = source && (typeof source === 'number' || source.uri);

  const containerClasses = [
    'rounded-full overflow-hidden items-center justify-center',
    sizeStyle.container,
    !hasImage && name ? getColorFromName(name) : 'bg-secondary-200',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <View className={containerClasses} style={style} {...props}>
      {hasImage ? (
        <Image
          source={source}
          style={{ width: sizeStyle.size, height: sizeStyle.size }}
          resizeMode="cover"
        />
      ) : name ? (
        <Text className={`font-semibold text-white ${sizeStyle.text}`}>
          {getInitials(name)}
        </Text>
      ) : (
        <View className={`w-full h-full bg-secondary-300 items-center justify-center`}>
          <Text className={`text-secondary-500 ${sizeStyle.text}`}>?</Text>
        </View>
      )}
    </View>
  );
}

// Avatar group for stacked avatars
interface AvatarGroupProps extends Omit<ViewProps, 'style'> {
  avatars: Array<{ source?: { uri: string }; name?: string }>;
  max?: number;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = 'md',
  style,
  className = '',
  ...props
}: AvatarGroupProps) {
  const displayed = avatars.slice(0, max);
  const remaining = avatars.length - max;
  const sizeStyle = sizeStyles[size];

  return (
    <View className={`flex-row ${className}`} style={style} {...props}>
      {displayed.map((avatar, index) => (
        <View
          key={index}
          style={{ marginLeft: index === 0 ? 0 : -(sizeStyle.size / 3) }}
          className="border-2 border-white rounded-full"
        >
          <Avatar source={avatar.source} name={avatar.name} size={size} />
        </View>
      ))}
      {remaining > 0 && (
        <View
          style={{ marginLeft: -(sizeStyle.size / 3) }}
          className={`${sizeStyle.container} rounded-full bg-secondary-200 items-center justify-center border-2 border-white`}
        >
          <Text className={`font-semibold text-secondary-600 ${sizeStyle.text}`}>
            +{remaining}
          </Text>
        </View>
      )}
    </View>
  );
}
