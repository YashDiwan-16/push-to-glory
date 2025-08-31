import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '../components/Loading';

/**
 * Route-based lazy loading components
 * Pre-configured for page-level code splitting
 */
export const LazyPages = {
  Dashboard: lazy(() => import('../pages/Dashboard')),
  Portfolio: lazy(() => import('../pages/Portfolio')),
  Security: lazy(() => import('../pages/Security')),
  Settings: lazy(() => import('../pages/Settings')),
  Staking: lazy(() => import('../pages/Staking')),
  Swap: lazy(() => import('../pages/Swap')),
  NFTGallery: lazy(() => import('../pages/NFTGallery')),
  ContactUs: lazy(() => import('../pages/ContactUs')),
} as const;

/**
 * Wrapper component for lazy-loaded routes
 */
export function LazyPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    }>
      {children}
    </Suspense>
  );
}

export default LazyPages;
