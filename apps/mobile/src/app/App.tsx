import { StatusBar } from 'expo-status-bar';
import { ErrorBoundary } from '@app/ui';

import { RootNavigator } from '../navigation/RootNavigator';
import { AppProviders } from './Providers';

export default function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // TODO: Integrate error logging service (e.g., Sentry)
        console.error('Application Error:', error, errorInfo);
      }}
    >
      <AppProviders>
        <StatusBar style="auto" />
        <RootNavigator />
      </AppProviders>
    </ErrorBoundary>
  );
}
