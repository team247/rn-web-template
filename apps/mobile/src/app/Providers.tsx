import { NavigationContainer } from '@react-navigation/native';
import { Providers as UIProviders } from '@app/ui';
import type { ReactNode } from 'react';

import { linking } from '../navigation/linking';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <UIProviders>
      <NavigationContainer linking={linking}>
        {children}
      </NavigationContainer>
    </UIProviders>
  );
}
