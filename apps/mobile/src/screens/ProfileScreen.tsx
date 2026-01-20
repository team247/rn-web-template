import { View } from 'react-native';
import { Container, H2, Text, Avatar, Card, CardContent, Badge, Button } from '@app/ui';
import { useAuthStore, formatDate } from '@app/core';

import type { RootStackScreenProps } from '../navigation/types';

type Props = RootStackScreenProps<'Profile'>;

export function ProfileScreen({ navigation }: Props) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <Container center>
        <Text color="muted">User not found</Text>
      </Container>
    );
  }

  return (
    <Container scroll padding="md">
      {/* Profile Header */}
      <View className="items-center py-6">
        <Avatar
          name={user.name}
          source={user.avatar ? { uri: user.avatar } : undefined}
          size="2xl"
        />
        <H2 className="mt-4">{user.name}</H2>
        <Text color="muted">{user.email}</Text>
        <Badge variant="success" className="mt-2">
          Verified
        </Badge>
      </View>

      {/* Profile Stats */}
      <View className="flex-row justify-around py-4 mb-4">
        <View className="items-center">
          <Text weight="bold" className="text-xl">
            12
          </Text>
          <Text color="muted" variant="body-sm">
            Posts
          </Text>
        </View>
        <View className="items-center">
          <Text weight="bold" className="text-xl">
            248
          </Text>
          <Text color="muted" variant="body-sm">
            Followers
          </Text>
        </View>
        <View className="items-center">
          <Text weight="bold" className="text-xl">
            156
          </Text>
          <Text color="muted" variant="body-sm">
            Following
          </Text>
        </View>
      </View>

      {/* Profile Details */}
      <Card className="mb-4">
        <CardContent>
          <Text weight="semibold" className="mb-3">
            About
          </Text>
          <Text color="secondary">
            This is a demo profile page. In a real app, this would show the user's
            bio, social links, and other profile information.
          </Text>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="mb-4">
        <CardContent>
          <Text weight="semibold" className="mb-3">
            Account Information
          </Text>

          <View className="gap-3">
            <View className="flex-row justify-between">
              <Text color="muted">User ID</Text>
              <Text>{user.id}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text color="muted">Email</Text>
              <Text>{user.email}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text color="muted">Member since</Text>
              <Text>{formatDate(user.createdAt, 'MMM yyyy')}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text color="muted">Last updated</Text>
              <Text>{formatDate(user.updatedAt, 'MMM d, yyyy')}</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Actions */}
      <View className="gap-3">
        <Button variant="outline" fullWidth>
          Edit Profile
        </Button>
        <Button variant="ghost" fullWidth onPress={() => navigation.goBack()}>
          Go Back
        </Button>
      </View>
    </Container>
  );
}
