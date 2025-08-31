import { useState, useCallback, useRef, useEffect } from 'react';

interface TaskQueue {
  id: string;
  task: () => Promise<unknown>;
  priority: number;
  createdAt: number;
}

interface ConcurrencyOptions {
  maxConcurrent?: number;
  retryAttempts?: number;
  retryDelay?: number;
  timeout?: number;
  priority?: number;
}

/**
 * Advanced async operations hook with concurrency control
 */
export function useAsyncQueue(options: ConcurrencyOptions = {}) {
  const {
    maxConcurrent = 3,
    retryAttempts = 3,
    retryDelay = 1000,
    timeout = 30000
  } = options;

  const [state, setState] = useState({
    running: new Set<string>(),
    queued: [] as TaskQueue[],
    completed: new Set<string>(),
    failed: new Map<string, Error>(),
    results: new Map<string, unknown>()
  });

  const queueRef = useRef<TaskQueue[]>([]);
  const runningRef = useRef(new Set<string>());

  const processQueue = useCallback(async () => {
    while (runningRef.current.size < maxConcurrent && queueRef.current.length > 0) {
      // Sort by priority (higher number = higher priority)
      queueRef.current.sort((a, b) => b.priority - a.priority);
      
      const taskItem = queueRef.current.shift();
      if (!taskItem) break;

      runningRef.current.add(taskItem.id);
      
      setState(prev => ({
        ...prev,
        running: new Set(runningRef.current),
        queued: [...queueRef.current]
      }));

      const executeWithRetry = async (attempts: number): Promise<void> => {
        try {
          const result = await Promise.race([
            taskItem.task(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), timeout)
            )
          ]);

          setState(prev => ({
            ...prev,
            results: new Map(prev.results).set(taskItem.id, result),
            completed: new Set([...prev.completed, taskItem.id])
          }));

        } catch (error) {
          if (attempts > 0) {
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            await executeWithRetry(attempts - 1);
          } else {
            setState(prev => ({
              ...prev,
              failed: new Map(prev.failed).set(taskItem.id, error as Error)
            }));
          }
        } finally {
          runningRef.current.delete(taskItem.id);
          setState(prev => ({
            ...prev,
            running: new Set(runningRef.current)
          }));
          
          // Continue processing queue
          processQueue();
        }
      };

      executeWithRetry(retryAttempts);
    }
  }, [maxConcurrent, retryAttempts, retryDelay, timeout]);

  const enqueue = useCallback(<T>(
    id: string,
    task: () => Promise<T>,
    taskOptions?: Partial<ConcurrencyOptions>
  ): Promise<T> => {
    const priority = taskOptions?.priority || 0;
    
    return new Promise((resolve, reject) => {
      const taskItem: TaskQueue = {
        id,
        task: async () => {
          try {
            const result = await task();
            resolve(result);
            return result;
          } catch (error) {
            reject(error);
            throw error;
          }
        },
        priority,
        createdAt: Date.now()
      };

      queueRef.current.push(taskItem);
      
      setState(prev => ({
        ...prev,
        queued: [...queueRef.current]
      }));

      processQueue();
    });
  }, [processQueue]);

  const cancel = useCallback((id: string) => {
    queueRef.current = queueRef.current.filter(item => item.id !== id);
    setState(prev => ({
      ...prev,
      queued: [...queueRef.current]
    }));
  }, []);

  const clear = useCallback(() => {
    queueRef.current = [];
    setState(prev => ({
      ...prev,
      queued: [],
      completed: new Set(),
      failed: new Map(),
      results: new Map()
    }));
  }, []);

  const getStatus = useCallback((id: string) => {
    if (state.running.has(id)) return 'running';
    if (state.completed.has(id)) return 'completed';
    if (state.failed.has(id)) return 'failed';
    if (queueRef.current.some(item => item.id === id)) return 'queued';
    return 'not_found';
  }, [state]);

  return {
    enqueue,
    cancel,
    clear,
    getStatus,
    state: {
      ...state,
      isIdle: state.running.size === 0 && state.queued.length === 0
    }
  };
}

/**
 * Debounced async operations hook
 */
export function useDebouncedAsync<T, Args extends unknown[]>(
  asyncFn: (...args: Args) => Promise<T>,
  delay: number = 300
) {
  const [state, setState] = useState<{
    loading: boolean;
    data: T | null;
    error: Error | null;
  }>({
    loading: false,
    data: null,
    error: null
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const debouncedExecute = useCallback((...args: Args) => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    timeoutRef.current = setTimeout(async () => {
      try {
        abortControllerRef.current = new AbortController();
        const result = await asyncFn(...args);
        
        setState({
          loading: false,
          data: result,
          error: null
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setState({
            loading: false,
            data: null,
            error: error as Error
          });
        }
      }
    }, delay);
  }, [asyncFn, delay]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setState(prev => ({ ...prev, loading: false }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return {
    execute: debouncedExecute,
    cancel,
    ...state
  };
}

/**
 * Parallel async operations with batching
 */
export function useParallelAsync<T>() {
  const [state, setState] = useState<{
    loading: boolean;
    completed: number;
    total: number;
    results: T[];
    errors: Error[];
  }>({
    loading: false,
    completed: 0,
    total: 0,
    results: [],
    errors: []
  });

  const executeParallel = useCallback(async (
    tasks: Array<() => Promise<T>>,
    options: {
      batchSize?: number;
      onProgress?: (completed: number, total: number) => void;
      onBatchComplete?: (batchResults: T[], batchIndex: number) => void;
    } = {}
  ): Promise<T[]> => {
    const { batchSize = 5, onProgress, onBatchComplete } = options;
    
    setState({
      loading: true,
      completed: 0,
      total: tasks.length,
      results: [],
      errors: []
    });

    const results: T[] = [];
    const errors: Error[] = [];

    // Process tasks in batches
    for (let i = 0; i < tasks.length; i += batchSize) {
      const batch = tasks.slice(i, i + batchSize);
      const batchPromises = batch.map(async (task, index) => {
        try {
          const result = await task();
          return { success: true as const, result, index: i + index };
        } catch (error) {
          return { success: false as const, error: error as Error, index: i + index };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      const batchSuccesses: T[] = [];

      batchResults.forEach(result => {
        if (result.success) {
          results[result.index] = result.result;
          batchSuccesses.push(result.result);
        } else {
          errors[result.index] = result.error;
        }
      });

      const completed = Math.min(i + batchSize, tasks.length);
      
      setState(prev => ({
        ...prev,
        completed,
        results: [...results],
        errors: [...errors]
      }));

      onProgress?.(completed, tasks.length);
      onBatchComplete?.(batchSuccesses, Math.floor(i / batchSize));
    }

    setState(prev => ({
      ...prev,
      loading: false
    }));

    return results.filter(result => result !== undefined);
  }, []);

  return {
    executeParallel,
    ...state
  };
}

/**
 * Resource pool for managing limited resources
 */
export function useResourcePool<T>(
  createResource: () => Promise<T>,
  destroyResource: (resource: T) => Promise<void>,
  maxPoolSize: number = 5
) {
  const poolRef = useRef<T[]>([]);
  const borrowedRef = useRef(new Set<T>());
  const [poolStats, setPoolStats] = useState({
    available: 0,
    borrowed: 0,
    total: 0
  });

  const updateStats = useCallback(() => {
    setPoolStats({
      available: poolRef.current.length,
      borrowed: borrowedRef.current.size,
      total: poolRef.current.length + borrowedRef.current.size
    });
  }, []);

  const acquire = useCallback(async (): Promise<T> => {
    // Try to get from pool first
    if (poolRef.current.length > 0) {
      const resource = poolRef.current.pop()!;
      borrowedRef.current.add(resource);
      updateStats();
      return resource;
    }

    // Create new resource if under limit
    if (borrowedRef.current.size < maxPoolSize) {
      const resource = await createResource();
      borrowedRef.current.add(resource);
      updateStats();
      return resource;
    }

    // Wait for a resource to become available
    return new Promise((resolve) => {
      const checkForAvailable = () => {
        if (poolRef.current.length > 0) {
          const resource = poolRef.current.pop()!;
          borrowedRef.current.add(resource);
          updateStats();
          resolve(resource);
        } else {
          setTimeout(checkForAvailable, 100);
        }
      };
      checkForAvailable();
    });
  }, [createResource, maxPoolSize, updateStats]);

  const release = useCallback(async (resource: T) => {
    if (borrowedRef.current.has(resource)) {
      borrowedRef.current.delete(resource);
      poolRef.current.push(resource);
      updateStats();
    }
  }, [updateStats]);

  const destroy = useCallback(async (resource: T) => {
    if (borrowedRef.current.has(resource)) {
      borrowedRef.current.delete(resource);
      await destroyResource(resource);
      updateStats();
    }
  }, [destroyResource, updateStats]);

  const clear = useCallback(async () => {
    // Destroy all pooled resources
    await Promise.all(
      poolRef.current.map(resource => destroyResource(resource))
    );
    
    poolRef.current = [];
    borrowedRef.current.clear();
    updateStats();
  }, [destroyResource, updateStats]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return {
    acquire,
    release,
    destroy,
    clear,
    stats: poolStats
  };
}

/**
 * Circuit breaker pattern for resilient async operations
 */
export function useCircuitBreaker<T, Args extends unknown[]>(
  asyncFn: (...args: Args) => Promise<T>,
  options: {
    failureThreshold?: number;
    recoveryTimeout?: number;
    monitoringPeriod?: number;
  } = {}
) {
  const {
    failureThreshold = 5,
    recoveryTimeout = 10000,
    monitoringPeriod = 60000
  } = options;

  const [state, setState] = useState<{
    status: 'closed' | 'open' | 'half-open';
    failures: number;
    lastFailureTime: number | null;
    successCount: number;
    totalCalls: number;
  }>({
    status: 'closed',
    failures: 0,
    lastFailureTime: null,
    successCount: 0,
    totalCalls: 0
  });

  const execute = useCallback(async (...args: Args): Promise<T> => {
    const now = Date.now();

    // Check if circuit should transition from open to half-open
    if (state.status === 'open' && state.lastFailureTime) {
      if (now - state.lastFailureTime >= recoveryTimeout) {
        setState(prev => ({ ...prev, status: 'half-open' }));
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    // If circuit is open, reject immediately
    if (state.status === 'open') {
      throw new Error('Circuit breaker is open');
    }

    try {
      const result = await asyncFn(...args);
      
      setState(prev => ({
        ...prev,
        status: 'closed',
        failures: 0,
        successCount: prev.successCount + 1,
        totalCalls: prev.totalCalls + 1,
        lastFailureTime: null
      }));

      return result;
    } catch (error) {
      const newFailures = state.failures + 1;
      
      setState(prev => ({
        ...prev,
        failures: newFailures,
        totalCalls: prev.totalCalls + 1,
        lastFailureTime: now,
        status: newFailures >= failureThreshold ? 'open' : prev.status
      }));

      throw error;
    }
  }, [asyncFn, state, failureThreshold, recoveryTimeout]);

  const reset = useCallback(() => {
    setState({
      status: 'closed',
      failures: 0,
      lastFailureTime: null,
      successCount: 0,
      totalCalls: 0
    });
  }, []);

  // Reset failure count periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        failures: Math.max(0, prev.failures - 1)
      }));
    }, monitoringPeriod);

    return () => clearInterval(interval);
  }, [monitoringPeriod]);

  return {
    execute,
    reset,
    state
  };
}

export default {
  useAsyncQueue,
  useDebouncedAsync,
  useParallelAsync,
  useResourcePool,
  useCircuitBreaker
};
