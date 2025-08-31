import { useState, useEffect, useCallback } from 'react';

export interface MediaQueryOptions {
  defaultMatches?: boolean;
}

/**
 * Custom hook for responsive media queries
 * Provides boolean state for media query matches
 */
export function useMediaQuery(
  query: string,
  options: MediaQueryOptions = {}
): boolean {
  const { defaultMatches = false } = options;
  
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultMatches;
    }
    return window.matchMedia(query).matches;
  });

  const updateMatches = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQueryList.matches);

    // Add listener
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', updateMatches);
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(updateMatches);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', updateMatches);
      } else {
        // Fallback for older browsers
        mediaQueryList.removeListener(updateMatches);
      }
    };
  }, [query, updateMatches]);

  return matches;
}

// Common breakpoint hooks
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');
export const useIsDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

export default useMediaQuery;
