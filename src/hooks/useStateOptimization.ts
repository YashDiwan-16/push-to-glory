import { useState, useCallback, useRef, useMemo } from 'react';

interface StateOptimizationConfig {
  batchUpdates?: boolean;
  debounceDelay?: number;
  maxBatchSize?: number;
}

/**
 * Optimized state management with batching and efficient updates
 */
export function useStateOptimization<T>(
  initialState: T,
  config: StateOptimizationConfig = {}
) {
  const { batchUpdates = true, debounceDelay = 10, maxBatchSize = 10 } = config;
  
  const [state, setState] = useState<T>(initialState);
  const batchQueue = useRef<Array<(prevState: T) => T>>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const processBatch = useCallback(() => {
    if (batchQueue.current.length === 0) return;

    const updates = [...batchQueue.current];
    batchQueue.current = [];

    setState(prevState => {
      return updates.reduce((acc, update) => update(acc), prevState);
    });
  }, []);

  const optimizedSetState = useCallback((updater: T | ((prevState: T) => T)) => {
    const updateFn = typeof updater === 'function' 
      ? updater as (prevState: T) => T
      : () => updater;

    if (!batchUpdates) {
      setState(updateFn);
      return;
    }

    batchQueue.current.push(updateFn);

    if (batchQueue.current.length >= maxBatchSize) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      processBatch();
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(processBatch, debounceDelay);
  }, [batchUpdates, maxBatchSize, debounceDelay, processBatch]);

  const optimizedState = useMemo(() => state, [state]);

  return [optimizedState, optimizedSetState] as const;
}

/**
 * Optimized array state with efficient operations
 */
export function useArrayState<T>(initialArray: T[] = []) {
  const [items, setItems] = useStateOptimization(initialArray);

  const operations = useMemo(() => ({
    add: (item: T) => setItems(prev => [...prev, item]),
    addMany: (newItems: T[]) => setItems(prev => [...prev, ...newItems]),
    remove: (index: number) => setItems(prev => prev.filter((_, i) => i !== index)),
    removeBy: (predicate: (item: T) => boolean) => 
      setItems(prev => prev.filter(item => !predicate(item))),
    update: (index: number, item: T) => 
      setItems(prev => prev.map((existing, i) => i === index ? item : existing)),
    updateBy: (predicate: (item: T) => boolean, updater: (item: T) => T) =>
      setItems(prev => prev.map(item => predicate(item) ? updater(item) : item)),
    clear: () => setItems([]),
    reset: () => setItems(initialArray)
  }), [setItems, initialArray]);

  return { items, ...operations };
}

/**
 * Optimized object state with shallow merging
 */
export function useObjectState<T extends Record<string, unknown>>(initialObject: T) {
  const [state, setState] = useStateOptimization(initialObject);

  const operations = useMemo(() => ({
    merge: (updates: Partial<T>) => setState(prev => ({ ...prev, ...updates })),
    set: (key: keyof T, value: T[keyof T]) => 
      setState(prev => ({ ...prev, [key]: value })),
    delete: (key: keyof T) => setState(prev => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...rest } = prev;
      return rest as T;
    }),
    reset: () => setState(initialObject)
  }), [setState, initialObject]);

  return { state, ...operations };
}

export default {
  useStateOptimization,
  useArrayState,
  useObjectState
};
