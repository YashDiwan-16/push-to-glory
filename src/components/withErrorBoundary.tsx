import type { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: import('react').ErrorInfo) => void;
}

/**
 * Higher-order component wrapper for ErrorBoundary
 * Provides an easy way to wrap components with error handling
 */
export function withErrorBoundary<P extends object>(
  Component: import('react').ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export default withErrorBoundary;
