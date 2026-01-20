'use client';

import { ErrorBoundary } from '@app/ui';
import type { ReactNode } from 'react';

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
}

export function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // TODO: Integrate error logging service (e.g., Sentry)
        console.error('Application Error:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
