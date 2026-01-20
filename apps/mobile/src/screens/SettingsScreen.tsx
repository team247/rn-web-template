import { View, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, H1, Text, Card, CardContent } from '@app/ui';
import { useAuthStore, useUIStore, useLogout } from '@app/core';

import type { MainTabScreenProps } from '../navigation/types';

type Props = MainTabScreenProps<'Settings'>;

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
}

function SettingItem({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  danger,
}: SettingItemProps) {
  const content = (
    <View className="flex-row items-center py-3">
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${
          danger ? 'bg-red-100' : 'bg-primary-100'
        }`}
      >
        <Ionicons
          name={icon}
          size={20}
          color={danger ? '#ef4444' : '#3b82f6'}
        />
      </View>
      <View className="flex-1 ml-3">
        <Text weight="medium" color={danger ? 'error' : 'primary'}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="body-sm" color="muted">
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

export function SettingsScreen({}: Props) {
  const user = useAuthStore((state) => state.user);
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  const isDarkMode = theme === 'dark';

  return (
    <Container scroll padding="md">
      <H1 className="mb-6">Settings</H1>

      {/* Account Section */}
      <Text weight="semibold" color="muted" variant="body-sm" className="mb-2 uppercase">
        Account
      </Text>
      <Card className="mb-6">
        <CardContent>
          <SettingItem
            icon="person-outline"
            title="Profile"
            subtitle={user?.email || 'Not signed in'}
            onPress={() => {}}
          />
          <View className="border-t border-secondary-100" />
          <SettingItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Manage push notifications"
            onPress={() => {}}
          />
          <View className="border-t border-secondary-100" />
          <SettingItem
            icon="shield-outline"
            title="Privacy & Security"
            onPress={() => {}}
          />
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Text weight="semibold" color="muted" variant="body-sm" className="mb-2 uppercase">
        Appearance
      </Text>
      <Card className="mb-6">
        <CardContent>
          <SettingItem
            icon="moon-outline"
            title="Dark Mode"
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
                trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
                thumbColor="#ffffff"
              />
            }
          />
        </CardContent>
      </Card>

      {/* Support Section */}
      <Text weight="semibold" color="muted" variant="body-sm" className="mb-2 uppercase">
        Support
      </Text>
      <Card className="mb-6">
        <CardContent>
          <SettingItem
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => {}}
          />
          <View className="border-t border-secondary-100" />
          <SettingItem
            icon="chatbubble-outline"
            title="Contact Us"
            onPress={() => {}}
          />
          <View className="border-t border-secondary-100" />
          <SettingItem
            icon="document-text-outline"
            title="Terms of Service"
            onPress={() => {}}
          />
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card variant="outlined" className="border-red-200">
        <CardContent>
          <SettingItem
            icon="log-out-outline"
            title={isLoggingOut ? 'Signing out...' : 'Sign Out'}
            danger
            onPress={handleLogout}
            rightElement={null}
          />
        </CardContent>
      </Card>

      {/* App Version */}
      <Text color="muted" variant="caption" align="center" className="mt-6">
        Version 1.0.0
      </Text>
    </Container>
  );
}
