/**
 * Performance optimization utilities
 * Provides efficient data structures and operations
 */

/**
 * Optimized Map-based cache with LRU eviction
 */
export class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

/**
 * Optimized Set operations for collections
 */
export class OptimizedSet<T> {
  private items = new Set<T>();

  constructor(items?: Iterable<T>) {
    if (items) {
      for (const item of items) {
        this.items.add(item);
      }
    }
  }

  add(item: T): this {
    this.items.add(item);
    return this;
  }

  has(item: T): boolean {
    return this.items.has(item);
  }

  delete(item: T): boolean {
    return this.items.delete(item);
  }

  union(other: OptimizedSet<T>): OptimizedSet<T> {
    const result = new OptimizedSet<T>();
    for (const item of this.items) {
      result.add(item);
    }
    for (const item of other.items) {
      result.add(item);
    }
    return result;
  }

  intersection(other: OptimizedSet<T>): OptimizedSet<T> {
    const result = new OptimizedSet<T>();
    for (const item of this.items) {
      if (other.has(item)) {
        result.add(item);
      }
    }
    return result;
  }

  difference(other: OptimizedSet<T>): OptimizedSet<T> {
    const result = new OptimizedSet<T>();
    for (const item of this.items) {
      if (!other.has(item)) {
        result.add(item);
      }
    }
    return result;
  }

  toArray(): T[] {
    return Array.from(this.items);
  }

  get size(): number {
    return this.items.size;
  }
}

/**
 * Optimized array operations using native methods
 */
export const ArrayUtils = {
  /**
   * Fast array deduplication using Set
   */
  unique<T>(array: T[]): T[] {
    return Array.from(new Set(array));
  },

  /**
   * Efficient array grouping using Map
   */
  groupBy<T, K>(array: T[], keyFn: (item: T) => K): Map<K, T[]> {
    const groups = new Map<K, T[]>();
    for (const item of array) {
      const key = keyFn(item);
      const group = groups.get(key);
      if (group) {
        group.push(item);
      } else {
        groups.set(key, [item]);
      }
    }
    return groups;
  },

  /**
   * Fast array intersection using Set
   */
  intersection<T>(arr1: T[], arr2: T[]): T[] {
    const set2 = new Set(arr2);
    return arr1.filter(item => set2.has(item));
  },

  /**
   * Efficient array difference using Set
   */
  difference<T>(arr1: T[], arr2: T[]): T[] {
    const set2 = new Set(arr2);
    return arr1.filter(item => !set2.has(item));
  },

  /**
   * Fast array chunking
   */
  chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  /**
   * Efficient array flattening
   */
  flatten<T>(arrays: T[][]): T[] {
    return arrays.flat();
  },

  /**
   * Optimized array shuffling (Fisher-Yates)
   */
  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  },

  /**
   * Binary search for sorted arrays
   */
  binarySearch<T>(
    array: T[],
    target: T,
    compareFn?: (a: T, b: T) => number
  ): number {
    let left = 0;
    let right = array.length - 1;
    
    const compare = compareFn || ((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const comparison = compare(array[mid], target);
      
      if (comparison === 0) {
        return mid;
      } else if (comparison < 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return -1;
  },

  /**
   * Optimized array sum calculation
   */
  sum(array: number[]): number {
    return array.reduce((sum, num) => sum + num, 0);
  },

  /**
   * Fast array average calculation
   */
  average(array: number[]): number {
    return array.length === 0 ? 0 : this.sum(array) / array.length;
  },

  /**
   * Efficient min/max finding
   */
  minMax(array: number[]): { min: number; max: number } | null {
    if (array.length === 0) return null;
    
    let min = array[0];
    let max = array[0];
    
    for (let i = 1; i < array.length; i++) {
      if (array[i] < min) min = array[i];
      if (array[i] > max) max = array[i];
    }
    
    return { min, max };
  }
};

/**
 * Object optimization utilities
 */
export const ObjectUtils = {
  /**
   * Fast object cloning using structuredClone (when available)
   */
  deepClone<T>(obj: T): T {
    if (typeof structuredClone === 'function') {
      return structuredClone(obj);
    }
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Efficient object merging
   */
  merge<T extends Record<string, unknown>>(
    target: T,
    ...sources: Partial<T>[]
  ): T {
    return Object.assign({}, target, ...sources);
  },

  /**
   * Fast object key extraction
   */
  keys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
  },

  /**
   * Optimized object filtering
   */
  filter<T extends Record<string, unknown>>(
    obj: T,
    predicate: (key: keyof T, value: T[keyof T]) => boolean
  ): Partial<T> {
    const result: Partial<T> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (predicate(key as keyof T, value as T[keyof T])) {
        result[key as keyof T] = value as T[keyof T];
      }
    }
    return result;
  }
};

export default { LRUCache, OptimizedSet, ArrayUtils, ObjectUtils };
