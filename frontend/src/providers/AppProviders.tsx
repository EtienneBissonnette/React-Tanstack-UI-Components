import { type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { ThemeProvider } from '@/context';
import { ToastProvider } from '@/components/ui';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider position="top-right">
          {children}
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
