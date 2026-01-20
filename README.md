# RN Web Template

A production-ready monorepo template for building cross-platform applications that run on iOS, Android, and Web from a single codebase.

## Features

- **Cross-Platform**: Single codebase for iOS, Android, and responsive Web
- **Type-Safe**: Full TypeScript support with Zod validation
- **Modern Stack**: Expo SDK 54+, Next.js 15+, React Navigation v7
- **Shared Code**: Reusable UI components and business logic across platforms
- **Styling**: NativeWind (Tailwind CSS for React Native) works everywhere
- **State Management**: Zustand for client state, TanStack Query for server state
- **Monorepo**: pnpm workspaces with Turborepo for fast builds
- **Secure Storage**: expo-secure-store for encrypted token storage on mobile
- **Form Handling**: react-hook-form with Zod validation
- **Error Handling**: Built-in ErrorBoundary components
- **Testing**: Jest + React Testing Library configured

## Tech Stack

| Category | Technology |
|----------|-----------|
| Package Manager | pnpm + workspaces |
| Build Orchestration | Turborepo |
| Mobile | Expo SDK 54+ |
| Web | Next.js 15+ (App Router) |
| Navigation | React Navigation v7 + Solito |
| State (Client) | Zustand |
| State (Server) | TanStack Query v5 |
| Styling | NativeWind v4 + Tailwind CSS |
| HTTP Client | Axios |
| Validation | Zod |
| Forms | react-hook-form |
| Date Handling | date-fns |
| Testing | Jest + React Testing Library |

## Project Structure

```
rn-web-template/
├── apps/
│   ├── mobile/              # Expo app (iOS + Android)
│   │   └── src/
│   │       ├── app/         # App entry point
│   │       ├── lib/         # Platform-specific utilities (secureStorage)
│   │       ├── navigation/  # React Navigation setup
│   │       └── screens/     # Screen components
│   └── web/                 # Next.js responsive web
│       └── app/             # Next.js App Router pages
├── packages/
│   ├── core/                # Shared business logic
│   │   ├── api/             # API client & endpoints
│   │   ├── hooks/           # React Query hooks + useZodForm
│   │   ├── store/           # Zustand stores (auth, ui)
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   └── __tests__/       # Unit tests
│   ├── ui/                  # Shared UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── ErrorBoundary/   # Error catching component
│   │   ├── Skeleton/        # Loading state components
│   │   └── ...
│   └── config/              # Shared configurations
│       ├── eslint/
│       ├── typescript/
│       ├── tailwind/
│       └── jest/            # Shared Jest configuration
├── .husky/                  # Git hooks (pre-commit)
├── turbo.json               # Turborepo config
└── pnpm-workspace.yaml      # Workspace config
```

## Getting Started

### Prerequisites

- Node.js 22+ (always use the newest LTS version)
- pnpm 9+
- iOS: Xcode (for iOS development)
- Android: Android Studio (for Android development)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/rn-web-template.git
cd rn-web-template

# Install dependencies
pnpm install
```

### Development

```bash
# Start all apps in development mode
pnpm dev

# Start only mobile app
pnpm dev:mobile

# Start only web app
pnpm dev:web
```

### Building

```bash
# Build all apps
pnpm build

# Type check all packages
pnpm typecheck

# Lint all packages
pnpm lint
```

### Mobile Development

```bash
# Start Expo development server
cd apps/mobile
pnpm dev

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android
```

### EAS Build (Production)

```bash
# Development build (with dev client)
cd apps/mobile
eas build --profile development

# Preview build (for testing)
eas build --profile preview

# Production build
eas build --profile production
```

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for a specific package
cd packages/core && pnpm test

# Run tests with coverage
cd packages/core && pnpm test:coverage
```

### Test Structure

- **Unit tests for utilities**: `packages/core/src/__tests__/`
- **Store tests**: `packages/core/src/store/__tests__/`
- **API tests**: `packages/core/src/api/__tests__/`
- **Component tests**: `packages/ui/src/**/__tests__/`

### Writing Tests

Tests use Jest and React Testing Library. Example:

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@app/ui';

describe('Button', () => {
  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Click</Button>);
    fireEvent.press(getByText('Click'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure your environment:

```bash
cp .env.example .env
```

### EAS Build

1. Create an Expo account at https://expo.dev
2. Install EAS CLI: `npm install -g eas-cli`
3. Login: `eas login`
4. Configure your project ID in `apps/mobile/app.config.js`
5. Build: `eas build --profile preview`

## Architecture

### Shared Packages

- **@app/core**: Business logic, API clients, state management, and utilities shared across platforms
- **@app/ui**: React Native components styled with NativeWind that work on mobile and web
- **@app/config**: Shared TypeScript, ESLint, Tailwind, and Jest configurations

### State Management

- **Zustand**: Client-side state (auth, UI preferences)
- **TanStack Query**: Server state with caching, optimistic updates

### Navigation

- **Mobile**: React Navigation with native stack and bottom tabs
- **Web**: Next.js App Router
- **Universal**: Solito for shared navigation patterns

### Styling

NativeWind allows you to use Tailwind CSS classes in React Native:

```tsx
<View className="flex-1 bg-white p-4">
  <Text className="text-lg font-bold text-gray-900">
    Hello World
  </Text>
</View>
```

## Security

### Secure Storage

The template uses `expo-secure-store` for sensitive data (auth tokens) on mobile:

- Auth tokens are stored encrypted on mobile devices
- Web uses localStorage (consider httpOnly cookies for production)
- Storage is automatically initialized in `apps/mobile/index.js`

```tsx
// Storage is initialized automatically, but you can customize:
import { setSecureStorageImplementation } from '@app/core';

// Custom storage adapter
setSecureStorageImplementation({
  getItem: async (key) => { /* ... */ },
  setItem: async (key, value) => { /* ... */ },
  removeItem: async (key) => { /* ... */ },
});
```

## Error Handling

### Error Boundaries

The template includes an `ErrorBoundary` component that catches React errors:

```tsx
import { ErrorBoundary } from '@app/ui';

<ErrorBoundary
  onError={(error, errorInfo) => {
    // Log to error tracking service (e.g., Sentry)
    console.error(error, errorInfo);
  }}
  fallback={<CustomErrorUI />}
>
  <YourApp />
</ErrorBoundary>
```

Both mobile and web apps have ErrorBoundary configured at the root level.

## Forms

### Form Validation with Zod

Use `useZodForm` hook for type-safe form validation:

```tsx
import { useZodForm } from '@app/core';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

function LoginForm() {
  const form = useZodForm({
    schema,
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = form.handleSubmit((data) => {
    // data is typed as { email: string; password: string }
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <input {...form.register('email')} />
      {form.formState.errors.email && (
        <span>{form.formState.errors.email.message}</span>
      )}
      {/* ... */}
    </form>
  );
}
```

## UI Components

### Available Components

| Component | Description |
|-----------|-------------|
| `Button` | Various variants (primary, secondary, outline, ghost, danger) and sizes |
| `Input` | Form input with label, error, and hint support |
| `Card` | Container component with CardHeader, CardContent, CardFooter |
| `Text` | Typography components (Text, H1, H2, H3, H4, Caption) |
| `Avatar` | User avatar with AvatarGroup for stacking |
| `Badge` | Status badges |
| `Container` | Layout containers |
| `ErrorBoundary` | Error catching component |
| `Skeleton` | Loading placeholders (Skeleton, SkeletonText, SkeletonCard, SkeletonList) |

### Usage Example

```tsx
import { Button, Card, CardContent, Input, Skeleton } from '@app/ui';

// Button variants
<Button variant="primary">Primary</Button>
<Button variant="outline" size="sm">Small Outline</Button>
<Button loading>Loading...</Button>

// Card
<Card>
  <CardContent>
    <Input label="Email" placeholder="Enter email" />
    <Button fullWidth>Submit</Button>
  </CardContent>
</Card>

// Loading state
{isLoading ? <SkeletonCard /> : <ActualContent />}
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm dev:mobile` | Start mobile app only |
| `pnpm dev:web` | Start web app only |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | Type check all packages |
| `pnpm test` | Run all tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm clean` | Clean all build artifacts |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
