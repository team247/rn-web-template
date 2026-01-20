import type { Metadata } from 'next';

import { Providers } from './providers';
import { ErrorBoundaryWrapper } from './error-boundary';

import './globals.css';

export const metadata: Metadata = {
  title: 'MyApp',
  description: 'Cross-platform application built with React Native and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundaryWrapper>
          <Providers>{children}</Providers>
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}
