import { View, Alert } from 'react-native';
import { useState } from 'react';
import { Container, H1, Text, Input, Button, Card, CardContent } from '@app/ui';
import { useLogin, useAuthStore, LoginCredentialsSchema, type LoginCredentials } from '@app/core';

import type { AuthStackScreenProps } from '../navigation/types';

type Props = AuthStackScreenProps<'Login'>;

export function LoginScreen({}: Props) {
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

  const handleLogin = () => {
    if (!validate()) return;

    login(
      { email, password },
      {
        onError: (error) => {
          Alert.alert('Login Failed', error.message || 'Please check your credentials');
        },
      }
    );
  };

  // Demo login for testing - uses store login directly
  const handleDemoLogin = () => {
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
  };

  return (
    <Container center keyboard padding="lg">
      <View className="w-full max-w-sm">
        {/* Logo/Header */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-primary-100 rounded-full items-center justify-center mb-4">
            <Text className="text-4xl">🚀</Text>
          </View>
          <H1 align="center">Welcome Back</H1>
          <Text color="muted" align="center" className="mt-2">
            Sign in to continue
          </Text>
        </View>

        {/* Login Form */}
        <Card>
          <CardContent>
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

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              secureTextEntry
            />

            <Button
              fullWidth
              loading={isPending}
              onPress={handleLogin}
              className="mt-2"
            >
              Sign In
            </Button>

            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-secondary-200" />
              <Text color="muted" variant="body-sm" className="mx-3">
                or
              </Text>
              <View className="flex-1 h-px bg-secondary-200" />
            </View>

            <Button
              variant="outline"
              fullWidth
              onPress={handleDemoLogin}
            >
              Continue with Demo Account
            </Button>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <View className="mt-6 items-center">
          <Text color="muted" variant="body-sm">
            Don't have an account?{' '}
            <Text color="primary" weight="semibold" className="text-primary-600">
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </Container>
  );
}
