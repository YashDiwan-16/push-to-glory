import { useRef, useCallback } from 'react';

/**
 * Custom hook for preventing rapid successive function calls
 * Useful for expensive operations like API calls or complex calculations
 */
export function useThrottle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number
): T {
  const lastExecuted = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastExecution = now - lastExecuted.current;

      if (timeSinceLastExecution >= delay) {
        lastExecuted.current = now;
        return callback(...args);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          lastExecuted.current = Date.now();
          callback(...args);
        }, delay - timeSinceLastExecution);
      }
    },
    [callback, delay]
  ) as T;

  return throttledCallback;
}

export default useThrottle;
