import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { type ReactNode, Suspense } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

interface QueryBoundaryProps {
  children: ReactNode
  loadingFallback?: ReactNode
  errorFallback?: (props: FallbackProps) => ReactNode
}

function DefaultErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export function QueryBoundary({
  children,
  loadingFallback = <div>Loading...</div>,
  errorFallback = DefaultErrorFallback,
}: QueryBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={errorFallback}>
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
