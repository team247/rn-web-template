import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, H1, Text, Button, Card, CardContent, Avatar, Badge } from '@app/ui';
import { useAuthStore, formatSmartDate } from '@app/core';

import type { MainTabScreenProps } from '../navigation/types';

type Props = MainTabScreenProps<'Home'>;

export function HomeScreen({}: Props) {
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);

  return (
    <Container padding="md">
      <View className="mb-6">
        <H1 className="mb-2">Welcome back!</H1>
        <Text color="muted">
          {formatSmartDate(new Date().toISOString())}
        </Text>
      </View>

      {/* User Card */}
      <Card className="mb-4">
        <CardContent>
          <View className="flex-row items-center">
            <Avatar
              name={user?.name || 'Guest User'}
              source={user?.avatar ? { uri: user.avatar } : undefined}
              size="lg"
            />
            <View className="ml-4 flex-1">
              <Text weight="semibold" className="text-lg">
                {user?.name || 'Guest User'}
              </Text>
              <Text color="muted" variant="body-sm">
                {user?.email || 'guest@example.com'}
              </Text>
            </View>
            <Badge variant="success" dot>
              Active
            </Badge>
          </View>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Text weight="semibold" className="mb-3">
        Quick Actions
      </Text>

      <View className="gap-3">
        <Button
          variant="primary"
          fullWidth
          onPress={() => navigation.navigate('Profile', {})}
        >
          View Profile
        </Button>

        <Button
          variant="outline"
          fullWidth
          onPress={() => navigation.navigate('Main', { screen: 'Settings' })}
        >
          Go to Settings
        </Button>
      </View>

      {/* Feature Cards */}
      <Text weight="semibold" className="mt-6 mb-3">
        Features
      </Text>

      <View className="gap-3">
        <Card variant="outlined">
          <CardContent>
            <Text weight="semibold">Cross-Platform</Text>
            <Text color="muted" variant="body-sm" className="mt-1">
              This app works on iOS, Android, and Web using shared code.
            </Text>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Text weight="semibold">Type-Safe Navigation</Text>
            <Text color="muted" variant="body-sm" className="mt-1">
              React Navigation with full TypeScript support.
            </Text>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Text weight="semibold">Shared State</Text>
            <Text color="muted" variant="body-sm" className="mt-1">
              Zustand stores work across all platforms.
            </Text>
          </CardContent>
        </Card>
      </View>
    </Container>
  );
}
