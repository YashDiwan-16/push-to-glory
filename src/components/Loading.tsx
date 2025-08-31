import { memo } from 'react';
import type { ReactNode } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

/**
 * Reusable loading spinner component
 * Provides consistent loading states across the app
 */
export const LoadingSpinner = memo<LoadingSpinnerProps>(({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const colorClasses = {
    primary: 'text-teal-600',
    secondary: 'text-slate-500',
    white: 'text-white',
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  children?: ReactNode;
  backdrop?: boolean;
}

/**
 * Full-screen loading overlay component
 * Provides modal-like loading states
 */
export const LoadingOverlay = memo<LoadingOverlayProps>(({
  isVisible,
  message = 'Loading...',
  children,
  backdrop = true,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        backdrop ? 'bg-black bg-opacity-50' : ''
      }`}
    >
      <div className="bg-white rounded-lg p-6 shadow-xl text-center">
        {children || (
          <>
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-slate-600">{message}</p>
          </>
        )}
      </div>
    </div>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';

interface SkeletonProps {
  lines?: number;
  className?: string;
  animated?: boolean;
}

/**
 * Skeleton loading component for text content
 * Provides placeholder content during loading
 */
export const Skeleton = memo<SkeletonProps>(({
  lines = 3,
  className = '',
  animated = true,
}) => {
  return (
    <div className={className}>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={`bg-slate-200 rounded mb-2 h-4 ${
            animated ? 'animate-pulse' : ''
          } ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
});

Skeleton.displayName = 'Skeleton';

interface CardSkeletonProps {
  className?: string;
  animated?: boolean;
}

/**
 * Card skeleton component for card layouts
 * Provides placeholder content for card-based UI
 */
export const CardSkeleton = memo<CardSkeletonProps>(({
  className = '',
  animated = true,
}) => {
  const pulseClass = animated ? 'animate-pulse' : '';

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className={`bg-slate-200 rounded h-6 w-3/4 mb-4 ${pulseClass}`} />
      <div className={`bg-slate-200 rounded h-4 w-full mb-2 ${pulseClass}`} />
      <div className={`bg-slate-200 rounded h-4 w-5/6 mb-2 ${pulseClass}`} />
      <div className={`bg-slate-200 rounded h-4 w-2/3 ${pulseClass}`} />
    </div>
  );
});

CardSkeleton.displayName = 'CardSkeleton';

export default LoadingSpinner;
