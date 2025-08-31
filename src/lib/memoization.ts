interface MemoizedSelectors<T> {
  [key: string]: (state: T) => unknown;
}

/**
 * Optimized state selectors with memoization
 * Prevents unnecessary re-renders in complex state structures
 */
export function createMemoizedSelectors<T>(
  selectors: MemoizedSelectors<T>
): MemoizedSelectors<T> {
  const memoizedSelectors: MemoizedSelectors<T> = {};

  Object.entries(selectors).forEach(([key, selector]) => {
    const cache = new Map<string, unknown>();
    
    memoizedSelectors[key] = (state: T) => {
      const stateStr = JSON.stringify(state);
      
      if (cache.has(stateStr)) {
        return cache.get(stateStr);
      }
      
      const result = selector(state);
      cache.set(stateStr, result);
      
      // Limit cache size to prevent memory leaks
      if (cache.size > 100) {
        const firstKey = cache.keys().next().value;
        if (firstKey) {
          cache.delete(firstKey);
        }
      }
      
      return result;
    };
  });

  return memoizedSelectors;
}

/**
 * Generic memoization cache
 */
export class MemoCache<T> {
  private cache = new Map<string, T>();
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  private getKey(args: unknown[]): string {
    return JSON.stringify(args);
  }

  get(args: unknown[], compute: () => T): T {
    const key = this.getKey(args);
    
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const result = compute();
    this.cache.set(key, result);

    // Evict oldest entry if cache is full
    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    return result;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

/**
 * Optimized array operations with built-in memoization
 */
export class MemoizedArrayOps {
  private static filterCache = new Map<string, unknown[]>();
  private static mapCache = new Map<string, unknown[]>();
  private static sortCache = new Map<string, unknown[]>();
  private static groupCache = new Map<string, Record<string | number, unknown[]>>();
  private static uniqueCache = new Map<string, unknown[]>();

  /**
   * Memoized array filtering
   */
  static filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
    const key = JSON.stringify({ array, predicateStr: predicate.toString() });
    
    if (this.filterCache.has(key)) {
      return this.filterCache.get(key) as T[];
    }

    const result = array.filter(predicate);
    this.filterCache.set(key, result);
    
    // Limit cache size
    if (this.filterCache.size > 100) {
      const firstKey = this.filterCache.keys().next().value;
      if (firstKey) {
        this.filterCache.delete(firstKey);
      }
    }

    return result;
  }

  /**
   * Memoized array mapping
   */
  static map<T, R>(array: T[], mapper: (item: T) => R): R[] {
    const key = JSON.stringify({ array, mapperStr: mapper.toString() });
    
    if (this.mapCache.has(key)) {
      return this.mapCache.get(key) as R[];
    }

    const result = array.map(mapper);
    this.mapCache.set(key, result);
    
    if (this.mapCache.size > 100) {
      const firstKey = this.mapCache.keys().next().value;
      if (firstKey) {
        this.mapCache.delete(firstKey);
      }
    }

    return result;
  }

  /**
   * Memoized array sorting
   */
  static sort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const key = JSON.stringify({ array, compareFnStr: compareFn?.toString() });
    
    if (this.sortCache.has(key)) {
      return this.sortCache.get(key) as T[];
    }

    const result = [...array].sort(compareFn);
    this.sortCache.set(key, result);
    
    if (this.sortCache.size > 100) {
      const firstKey = this.sortCache.keys().next().value;
      if (firstKey) {
        this.sortCache.delete(firstKey);
      }
    }

    return result;
  }

  /**
   * Memoized array grouping
   */
  static groupBy<T, K extends string | number>(
    array: T[], 
    keyFn: (item: T) => K
  ): Record<K, T[]> {
    const key = JSON.stringify({ array, keyFnStr: keyFn.toString() });
    
    if (this.groupCache.has(key)) {
      return this.groupCache.get(key) as Record<K, T[]>;
    }

    const groups = {} as Record<K, T[]>;
    
    for (const item of array) {
      const groupKey = keyFn(item);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
    }

    this.groupCache.set(key, groups);
    
    if (this.groupCache.size > 100) {
      const firstKey = this.groupCache.keys().next().value;
      if (firstKey) {
        this.groupCache.delete(firstKey);
      }
    }

    return groups;
  }

  /**
   * Memoized array deduplication
   */
  static unique<T>(array: T[], keyFn?: (item: T) => unknown): T[] {
    const key = JSON.stringify({ array, keyFnStr: keyFn?.toString() });
    
    if (this.uniqueCache.has(key)) {
      return this.uniqueCache.get(key) as T[];
    }

    let result: T[];
    
    if (!keyFn) {
      result = Array.from(new Set(array));
    } else {
      const seen = new Set();
      result = array.filter(item => {
        const itemKey = keyFn(item);
        if (seen.has(itemKey)) {
          return false;
        }
        seen.add(itemKey);
        return true;
      });
    }

    this.uniqueCache.set(key, result);
    
    if (this.uniqueCache.size > 100) {
      const firstKey = this.uniqueCache.keys().next().value;
      if (firstKey) {
        this.uniqueCache.delete(firstKey);
      }
    }

    return result;
  }

  /**
   * Clear all caches
   */
  static clearCaches(): void {
    this.filterCache.clear();
    this.mapCache.clear();
    this.sortCache.clear();
    this.groupCache.clear();
    this.uniqueCache.clear();
  }
}

/**
 * Optimized object operations with memoization
 */
export class MemoizedObjectOps {
  private static keysCache = new Map<string, string[]>();
  private static valuesCache = new Map<string, unknown[]>();
  private static entriesCache = new Map<string, [string, unknown][]>();

  /**
   * Memoized object keys
   */
  static keys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
    const key = JSON.stringify(obj);
    
    if (this.keysCache.has(key)) {
      return this.keysCache.get(key) as (keyof T)[];
    }

    const result = Object.keys(obj) as (keyof T)[];
    this.keysCache.set(key, result as string[]);
    
    if (this.keysCache.size > 100) {
      const firstKey = this.keysCache.keys().next().value;
      if (firstKey) {
        this.keysCache.delete(firstKey);
      }
    }

    return result;
  }

  /**
   * Memoized object values
   */
  static values<T extends Record<string, unknown>>(obj: T): T[keyof T][] {
    const key = JSON.stringify(obj);
    
    if (this.valuesCache.has(key)) {
      return this.valuesCache.get(key) as T[keyof T][];
    }

    const result = Object.values(obj);
    this.valuesCache.set(key, result);
    
    if (this.valuesCache.size > 100) {
      const firstKey = this.valuesCache.keys().next().value;
      if (firstKey) {
        this.valuesCache.delete(firstKey);
      }
    }

    return result as T[keyof T][];
  }

  /**
   * Memoized object entries
   */
  static entries<T extends Record<string, unknown>>(obj: T): [keyof T, T[keyof T]][] {
    const key = JSON.stringify(obj);
    
    if (this.entriesCache.has(key)) {
      return this.entriesCache.get(key) as [keyof T, T[keyof T]][];
    }

    const result = Object.entries(obj) as [keyof T, T[keyof T]][];
    this.entriesCache.set(key, result as [string, unknown][]);
    
    if (this.entriesCache.size > 100) {
      const firstKey = this.entriesCache.keys().next().value;
      if (firstKey) {
        this.entriesCache.delete(firstKey);
      }
    }

    return result;
  }

  /**
   * Clear all caches
   */
  static clearCaches(): void {
    this.keysCache.clear();
    this.valuesCache.clear();
    this.entriesCache.clear();
  }
}

/**
 * Memoized string operations
 */
export class MemoizedStringOps {
  private static cache = new Map<string, string | string[]>();

  /**
   * Memoized string formatting
   */
  static format(template: string, values: Record<string, unknown>): string {
    const key = JSON.stringify({ template, values });
    
    if (this.cache.has(key)) {
      return this.cache.get(key) as string;
    }

    const result = template.replace(/\{(\w+)\}/g, (match, varKey) => {
      return String(values[varKey] ?? match);
    });

    this.cache.set(key, result);
    
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    return result;
  }

  /**
   * Memoized string tokenization
   */
  static tokenize(text: string, separators: string[] = [' ', '\n', '\t']): string[] {
    const key = JSON.stringify({ text, separators });
    
    if (this.cache.has(key)) {
      return this.cache.get(key) as string[];
    }

    let tokens = [text];
    
    for (const separator of separators) {
      tokens = tokens.flatMap(token => token.split(separator));
    }
    
    const result = tokens.filter(token => token.length > 0);
    this.cache.set(key, result);
    
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    return result;
  }

  /**
   * Clear cache
   */
  static clearCache(): void {
    this.cache.clear();
  }
}

/**
 * Optimized computation scheduler for heavy operations
 */
export class ComputationScheduler {
  private static queue: Array<{ fn: () => unknown; resolve: (value: unknown) => void; reject: (error: Error) => void }> = [];
  private static isProcessing = false;

  /**
   * Schedule computation to run in next available frame
   */
  static schedule<T>(computation: () => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({
        fn: computation,
        resolve: resolve as (value: unknown) => void,
        reject
      });

      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  private static async processQueue(): Promise<void> {
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (!task) break;

      try {
        // Use requestIdleCallback if available, otherwise setTimeout
        await new Promise<void>(resolve => {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
              try {
                const result = task.fn();
                task.resolve(result);
                resolve();
              } catch (error) {
                task.reject(error as Error);
                resolve();
              }
            });
          } else {
            setTimeout(() => {
              try {
                const result = task.fn();
                task.resolve(result);
                resolve();
              } catch (error) {
                task.reject(error as Error);
                resolve();
              }
            }, 0);
          }
        });
      } catch (error) {
        task.reject(error as Error);
      }
    }

    this.isProcessing = false;
  }
}

export default {
  createMemoizedSelectors,
  MemoCache,
  MemoizedArrayOps,
  MemoizedObjectOps,
  MemoizedStringOps,
  ComputationScheduler
};
