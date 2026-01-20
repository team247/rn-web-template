import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().url().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

export const UserProfileSchema = UserSchema.extend({
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const LoginCredentialsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

export const RegisterCredentialsSchema = LoginCredentialsSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;
