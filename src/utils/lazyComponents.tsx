import { lazy, Suspense } from 'react';
import type { ComponentType } from 'react';
import { LoadingSpinner } from '../components/Loading';

/**
 * Generic lazy loading wrapper with error boundary support
 * Provides code splitting for better performance
 */
export function createLazyComponent<T extends ComponentType<Record<string, unknown>>>(
  importFunction: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunction);

  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback || <LoadingSpinner size="lg" className="mx-auto my-8" />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Route-based lazy loading components
 * Pre-configured for page-level code splitting
 */
export const LazyPages = {
  Dashboard: createLazyComponent(() => import('../pages/Dashboard')),
  Portfolio: createLazyComponent(() => import('../pages/Portfolio')),
  Security: createLazyComponent(() => import('../pages/Security')),
  Settings: createLazyComponent(() => import('../pages/Settings')),
  Staking: createLazyComponent(() => import('../pages/Staking')),
  Swap: createLazyComponent(() => import('../pages/Swap')),
  NFTGallery: createLazyComponent(() => import('../pages/NFTGallery')),
  ContactUs: createLazyComponent(() => import('../pages/ContactUs')),
} as const;
