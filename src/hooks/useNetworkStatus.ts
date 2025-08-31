import { useState, useEffect, useCallback } from 'react';

export interface OnlineStatus {
  isOnline: boolean;
  isOffline: boolean;
}

/**
 * Custom hook for network status detection
 * Provides online/offline state with event listeners
 */
export function useNetworkStatus(): OnlineStatus {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof navigator === 'undefined') {
      return true; // Default to online for SSR
    }
    return navigator.onLine;
  });

  const handleOnline = useCallback(() => {
    setIsOnline(true);
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Set initial state
    setIsOnline(navigator.onLine);

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return {
    isOnline,
    isOffline: !isOnline,
  };
}

export default useNetworkStatus;
