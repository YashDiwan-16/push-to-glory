import { useState, useCallback, useRef } from 'react';

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface ApiActions<T, TArgs extends unknown[]> {
  execute: (...args: TArgs) => Promise<T>;
  reset: () => void;
}

/**
 * Custom hook for async API operations
 * Provides loading, error, and data states
 */
export function useAsync<T, TArgs extends unknown[] = []>(
  asyncFunction: (...args: TArgs) => Promise<T>
): [ApiState<T>, ApiActions<T, TArgs>] {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const cancelRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (...args: TArgs): Promise<T> => {
    // Cancel previous request if still pending
    if (cancelRef.current) {
      cancelRef.current.abort();
    }

    cancelRef.current = new AbortController();
    
    setState({
      data: null,
      loading: true,
      error: null,
    });

    try {
      const result = await asyncFunction(...args);
      
      // Check if request was cancelled
      if (cancelRef.current?.signal.aborted) {
        return result;
      }

      setState({
        data: result,
        loading: false,
        error: null,
      });

      return result;
    } catch (error) {
      // Check if request was cancelled
      if (cancelRef.current?.signal.aborted) {
        return Promise.reject(error);
      }

      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });

      throw error;
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    if (cancelRef.current) {
      cancelRef.current.abort();
    }
    
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return [state, { execute, reset }];
}

export default useAsync;
