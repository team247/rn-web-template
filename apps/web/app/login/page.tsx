'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { View, Text as RNText } from 'react-native';
import { useLogin, useAuthStore, LoginCredentialsSchema, type LoginCredentials } from '@app/core';
import { Button, Card, CardContent, Input, H1, Text } from '@app/ui';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof LoginCredentials, string>>>({});

  const { mutate: login, isPending } = useLogin();
  const storeLogin = useAuthStore((state) => state.login);

  const validate = (): boolean => {
    const result = LoginCredentialsSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginCredentials, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LoginCredentials;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: (error) => {
          setErrors({ email: error.message || 'Login failed' });
        },
      }
    );
  };

  const handleDemoLogin = () => {
    // Use the store login directly without require()
    storeLogin(
      {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        accessToken: 'demo-token',
        refreshToken: 'demo-refresh',
        expiresIn: 3600,
      }
    );
    router.push('/');
  };

  return (
    <View className="min-h-screen bg-gray-50 items-center justify-center py-12 px-4">
      <View className="max-w-md w-full">
        {/* Logo */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-primary-100 rounded-full items-center justify-center mb-4">
            <RNText className="text-4xl">🚀</RNText>
          </View>
          <H1 align="center">Welcome Back</H1>
          <Text color="muted" align="center" className="mt-2">
            Sign in to continue
          </Text>
        </View>

        {/* Login Form */}
        <Card>
          <CardContent>
            <View className="gap-4">
              {/* Email */}
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Password */}
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                error={errors.password}
                secureTextEntry
              />

              {/* Submit */}
              <Button
                fullWidth
                loading={isPending}
                onPress={handleSubmit}
                className="mt-2"
              >
                Sign In
              </Button>

              {/* Divider */}
              <View className="flex-row items-center my-2">
                <View className="flex-1 h-px bg-gray-200" />
                <Text color="muted" variant="body-sm" className="mx-4">
                  or
                </Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              {/* Demo Login */}
              <Button
                variant="outline"
                fullWidth
                onPress={handleDemoLogin}
              >
                Continue with Demo Account
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Footer */}
        <View className="items-center mt-6">
          <Text color="muted">
            Don't have an account?{' '}
            <Link href="/">
              <Text color="primary" weight="semibold">
                Sign Up
              </Text>
            </Link>
          </Text>
        </View>

        <View className="items-center mt-4">
          <Link href="/">
            <Text color="muted">← Back to Home</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
