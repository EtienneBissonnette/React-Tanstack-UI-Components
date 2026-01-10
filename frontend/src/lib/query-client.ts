import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (
          typeof error === 'object' &&
          error !== null &&
          'statusCode' in error &&
          (error as { statusCode: number }).statusCode >= 400 &&
          (error as { statusCode: number }).statusCode < 500
        ) {
          return false
        }
        return failureCount < 3
      },
    },
    mutations: {
      retry: false,
    },
  },
})
