'use client';

import { Providers as UIProviders } from '@app/ui';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <UIProviders>{children}</UIProviders>;
}
