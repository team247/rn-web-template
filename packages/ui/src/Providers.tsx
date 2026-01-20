import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Stale time of 5 minutes
        staleTime: 5 * 60 * 1000,
        // Cache time of 30 minutes
        gcTime: 30 * 60 * 1000,
        // Retry once on failure
        retry: 1,
        // Don't refetch on window focus by default
        refetchOnWindowFocus: false,
      },
      mutations: {
        // Retry once on mutation failure
        retry: 1,
      },
    },
  });

export function Providers({ children }: ProvidersProps) {
  // Create QueryClient once per component lifecycle
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// Export QueryClient creator for SSR scenarios
export { createQueryClient };
