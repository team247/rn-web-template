'use client';

import Link from 'next/link';
import { View, Text as RNText } from 'react-native';
import { useAuthStore, formatSmartDate } from '@app/core';
import { Button, Card, CardContent, H1, Text, Avatar } from '@app/ui';

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <View className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <View className="bg-white shadow-sm border-b border-gray-200">
        <View className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <View className="flex-row justify-between h-16 items-center">
            <View className="flex-row items-center">
              <RNText className="text-2xl font-bold text-primary-600">MyApp</RNText>
            </View>
            <View className="flex-row items-center gap-4">
              <Link href="/settings">
                <Text color="muted" className="hover:text-gray-900">
                  Settings
                </Text>
              </Link>
              {isAuthenticated ? (
                <Link href="/profile" className="flex-row items-center gap-2">
                  <Avatar name={user?.name || 'User'} size="sm" />
                  <Text>{user?.name || 'User'}</Text>
                </Link>
              ) : (
                <Link href="/login">
                  <Button size="sm">Sign In</Button>
                </Link>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Hero Section */}
      <View className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <View className="items-center mb-12">
          <H1 align="center" className="mb-4">
            Welcome to MyApp
          </H1>
          <Text color="muted" align="center" className="text-xl max-w-2xl">
            A cross-platform template built with Expo, Next.js, and shared
            components. Write once, run on iOS, Android, and Web.
          </Text>
          <Text color="muted" variant="body-sm" className="mt-4">
            {formatSmartDate(new Date().toISOString())}
          </Text>
        </View>

        {/* Feature Cards */}
        <View className="flex-row flex-wrap justify-center gap-6 mb-12">
          <Card variant="outlined" className="w-80">
            <CardContent>
              <View className="w-12 h-12 bg-primary-100 rounded-lg items-center justify-center mb-4">
                <RNText className="text-2xl">📱</RNText>
              </View>
              <Text weight="semibold" className="text-lg mb-2">
                Cross-Platform
              </Text>
              <Text color="muted">
                Build for iOS, Android, and Web from a single codebase using Expo
                and Next.js.
              </Text>
            </CardContent>
          </Card>

          <Card variant="outlined" className="w-80">
            <CardContent>
              <View className="w-12 h-12 bg-green-100 rounded-lg items-center justify-center mb-4">
                <RNText className="text-2xl">🎨</RNText>
              </View>
              <Text weight="semibold" className="text-lg mb-2">
                Shared Components
              </Text>
              <Text color="muted">
                Reusable UI components styled with NativeWind and Tailwind CSS
                that work everywhere.
              </Text>
            </CardContent>
          </Card>

          <Card variant="outlined" className="w-80">
            <CardContent>
              <View className="w-12 h-12 bg-purple-100 rounded-lg items-center justify-center mb-4">
                <RNText className="text-2xl">⚡</RNText>
              </View>
              <Text weight="semibold" className="text-lg mb-2">
                Type-Safe
              </Text>
              <Text color="muted">
                Full TypeScript support with Zod validation and type-safe state
                management.
              </Text>
            </CardContent>
          </Card>
        </View>

        {/* Tech Stack */}
        <Card variant="outlined" className="p-8">
          <CardContent>
            <Text weight="bold" align="center" className="text-2xl mb-6">
              Tech Stack
            </Text>
            <View className="flex-row flex-wrap justify-center gap-4">
              {[
                { name: 'Expo SDK 54', desc: 'Mobile framework' },
                { name: 'Next.js 15', desc: 'Web framework' },
                { name: 'React Navigation', desc: 'Mobile navigation' },
                { name: 'Solito', desc: 'Universal navigation' },
                { name: 'Zustand', desc: 'State management' },
                { name: 'TanStack Query', desc: 'Server state' },
                { name: 'NativeWind', desc: 'Styling' },
                { name: 'TypeScript', desc: 'Type safety' },
              ].map((tech) => (
                <View
                  key={tech.name}
                  className="items-center p-4 bg-gray-50 rounded-lg w-40"
                >
                  <Text weight="medium">{tech.name}</Text>
                  <Text color="muted" variant="body-sm">{tech.desc}</Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

        {/* CTA */}
        <View className="items-center mt-12">
          {!isAuthenticated && (
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
          )}
        </View>
      </View>

      {/* Footer */}
      <View className="bg-white border-t border-gray-200 mt-12">
        <View className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Text color="muted" align="center">
            Built with ❤️ using React Native and Next.js
          </Text>
        </View>
      </View>
    </View>
  );
}
