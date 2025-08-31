import { useState, useCallback, useRef, useEffect } from 'react';

interface CacheEntry<T> {
  value: T;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

interface CacheOptions {
  maxSize?: number;
  ttl?: number; // Time to live in milliseconds
  strategy?: 'lru' | 'lfu' | 'fifo' | 'ttl';
  persistent?: boolean;
}

/**
 * Advanced caching hook with multiple eviction strategies
 */
export function useAdvancedCache<K, V>(options: CacheOptions = {}) {
  const {
    maxSize = 100,
    ttl = 5 * 60 * 1000, // 5 minutes default
    strategy = 'lru',
    persistent = false
  } = options;

  const cacheRef = useRef(new Map<string, CacheEntry<V>>());
  const [cacheStats, setCacheStats] = useState({
    hits: 0,
    misses: 0,
    size: 0,
    hitRate: 0
  });

  const getKey = useCallback((key: K): string => {
    return typeof key === 'string' ? key : JSON.stringify(key);
  }, []);

  const updateStats = useCallback(() => {
    const cache = cacheRef.current;
    const total = cacheStats.hits + cacheStats.misses;
    setCacheStats(prev => ({
      ...prev,
      size: cache.size,
      hitRate: total > 0 ? (prev.hits / total) * 100 : 0
    }));
  }, [cacheStats.hits, cacheStats.misses]);

  const isExpired = useCallback((entry: CacheEntry<V>): boolean => {
    if (ttl <= 0) return false;
    return Date.now() - entry.timestamp > ttl;
  }, [ttl]);

  const evictByStrategy = useCallback(() => {
    const cache = cacheRef.current;
    
    if (cache.size < maxSize) return;

    let keyToEvict: string | null = null;

    switch (strategy) {
      case 'lru': // Least Recently Used
        {
          let oldestTime = Date.now();
          for (const [key, entry] of cache) {
            if (entry.lastAccessed < oldestTime) {
              oldestTime = entry.lastAccessed;
              keyToEvict = key;
            }
          }
        }
        break;

      case 'lfu': // Least Frequently Used
        {
          let minAccessCount = Infinity;
          for (const [key, entry] of cache) {
            if (entry.accessCount < minAccessCount) {
              minAccessCount = entry.accessCount;
              keyToEvict = key;
            }
          }
        }
        break;

      case 'fifo': // First In, First Out
        {
          let oldestTimestamp = Date.now();
          for (const [key, entry] of cache) {
            if (entry.timestamp < oldestTimestamp) {
              oldestTimestamp = entry.timestamp;
              keyToEvict = key;
            }
          }
        }
        break;

      case 'ttl': // Time To Live based
        {
          const now = Date.now();
          for (const [key, entry] of cache) {
            if (now - entry.timestamp > ttl) {
              keyToEvict = key;
              break;
            }
          }
        }
        break;
    }

    if (keyToEvict) {
      cache.delete(keyToEvict);
    }
  }, [maxSize, strategy, ttl]);

  const cleanExpired = useCallback(() => {
    const cache = cacheRef.current;
    const keysToDelete: string[] = [];

    for (const [key, entry] of cache) {
      if (isExpired(entry)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => cache.delete(key));
  }, [isExpired]);

  const get = useCallback((key: K): V | undefined => {
    const cache = cacheRef.current;
    const keyStr = getKey(key);
    const entry = cache.get(keyStr);

    if (!entry || isExpired(entry)) {
      setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }));
      if (entry) cache.delete(keyStr);
      return undefined;
    }

    // Update access info
    entry.lastAccessed = Date.now();
    entry.accessCount++;
    cache.set(keyStr, entry);

    setCacheStats(prev => ({ ...prev, hits: prev.hits + 1 }));
    return entry.value;
  }, [getKey, isExpired]);

  const set = useCallback((key: K, value: V): void => {
    const cache = cacheRef.current;
    const keyStr = getKey(key);
    
    evictByStrategy();
    cleanExpired();

    const now = Date.now();
    const entry: CacheEntry<V> = {
      value,
      timestamp: now,
      accessCount: 1,
      lastAccessed: now
    };

    cache.set(keyStr, entry);
    updateStats();
  }, [getKey, evictByStrategy, cleanExpired, updateStats]);

  const has = useCallback((key: K): boolean => {
    const cache = cacheRef.current;
    const keyStr = getKey(key);
    const entry = cache.get(keyStr);
    return !!entry && !isExpired(entry);
  }, [getKey, isExpired]);

  const delete_ = useCallback((key: K): boolean => {
    const cache = cacheRef.current;
    const keyStr = getKey(key);
    const deleted = cache.delete(keyStr);
    updateStats();
    return deleted;
  }, [getKey, updateStats]);

  const clear = useCallback(() => {
    cacheRef.current.clear();
    setCacheStats({ hits: 0, misses: 0, size: 0, hitRate: 0 });
  }, []);

  const getOrSet = useCallback(async (
    key: K, 
    factory: () => Promise<V> | V
  ): Promise<V> => {
    const cached = get(key);
    if (cached !== undefined) {
      return cached;
    }

    const value = await factory();
    set(key, value);
    return value;
  }, [get, set]);

  const memoize = useCallback(<Args extends unknown[], Return>(
    fn: (...args: Args) => Return | Promise<Return>,
    keyGenerator?: (...args: Args) => K
  ) => {
    const generateKey = keyGenerator || ((...args: Args) => args as unknown as K);
    
    return async (...args: Args): Promise<Return> => {
      const key = generateKey(...args);
      const cached = get(key);
      
      if (cached !== undefined) {
        return cached as Return;
      }

      const result = await fn(...args);
      set(key, result as V);
      return result;
    };
  }, [get, set]);

  // Periodic cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      cleanExpired();
      updateStats();
    }, 60000); // Clean every minute

    return () => clearInterval(interval);
  }, [cleanExpired, updateStats]);

  // Persistence
  useEffect(() => {
    if (!persistent) return;

    const saveToStorage = () => {
      const cache = cacheRef.current;
      const serializable = Array.from(cache.entries());
      localStorage.setItem('advanced-cache', JSON.stringify(serializable));
    };

    const loadFromStorage = () => {
      try {
        const stored = localStorage.getItem('advanced-cache');
        if (stored) {
          const entries = JSON.parse(stored) as [string, CacheEntry<V>][];
          const cache = new Map(entries);
          
          // Clean expired entries
          for (const [key, entry] of cache) {
            if (isExpired(entry)) {
              cache.delete(key);
            }
          }
          
          cacheRef.current = cache;
          updateStats();
        }
      } catch (error) {
        console.warn('Failed to load cache from storage:', error);
      }
    };

    loadFromStorage();
    window.addEventListener('beforeunload', saveToStorage);

    return () => {
      window.removeEventListener('beforeunload', saveToStorage);
    };
  }, [persistent, isExpired, updateStats]);

  return {
    get,
    set,
    has,
    delete: delete_,
    clear,
    getOrSet,
    memoize,
    stats: cacheStats,
    size: cacheRef.current.size
  };
}

/**
 * Multi-level cache hook with L1 (memory) and L2 (storage) levels
 */
export function useMultiLevelCache<K, V>(options: {
  l1Options?: CacheOptions;
  l2Options?: CacheOptions & { storageKey: string };
}) {
  const { l1Options = {}, l2Options } = options;
  
  const l1Cache = useAdvancedCache<K, V>(l1Options);
  const l2StorageKey = l2Options?.storageKey || 'multi-level-cache';

  const getFromL2 = useCallback(async (key: K): Promise<V | undefined> => {
    if (!l2Options) return undefined;

    try {
      const keyStr = typeof key === 'string' ? key : JSON.stringify(key);
      const stored = localStorage.getItem(`${l2StorageKey}-${keyStr}`);
      
      if (stored) {
        const entry = JSON.parse(stored) as CacheEntry<V>;
        
        // Check TTL
        if (l2Options.ttl && Date.now() - entry.timestamp > l2Options.ttl) {
          localStorage.removeItem(`${l2StorageKey}-${keyStr}`);
          return undefined;
        }
        
        return entry.value;
      }
    } catch (error) {
      console.warn('Failed to read from L2 cache:', error);
    }
    
    return undefined;
  }, [l2Options, l2StorageKey]);

  const setToL2 = useCallback((key: K, value: V): void => {
    if (!l2Options) return;

    try {
      const keyStr = typeof key === 'string' ? key : JSON.stringify(key);
      const entry: CacheEntry<V> = {
        value,
        timestamp: Date.now(),
        accessCount: 1,
        lastAccessed: Date.now()
      };
      
      localStorage.setItem(`${l2StorageKey}-${keyStr}`, JSON.stringify(entry));
    } catch (error) {
      console.warn('Failed to write to L2 cache:', error);
    }
  }, [l2Options, l2StorageKey]);

  const get = useCallback(async (key: K): Promise<V | undefined> => {
    // Try L1 first
    const l1Result = l1Cache.get(key);
    if (l1Result !== undefined) {
      return l1Result;
    }

    // Try L2
    const l2Result = await getFromL2(key);
    if (l2Result !== undefined) {
      // Promote to L1
      l1Cache.set(key, l2Result);
      return l2Result;
    }

    return undefined;
  }, [l1Cache, getFromL2]);

  const set = useCallback((key: K, value: V): void => {
    l1Cache.set(key, value);
    setToL2(key, value);
  }, [l1Cache, setToL2]);

  const getOrSet = useCallback(async (
    key: K,
    factory: () => Promise<V> | V
  ): Promise<V> => {
    const cached = await get(key);
    if (cached !== undefined) {
      return cached;
    }

    const value = await factory();
    set(key, value);
    return value;
  }, [get, set]);

  return {
    get,
    set,
    getOrSet,
    l1Cache,
    clear: () => {
      l1Cache.clear();
      if (l2Options) {
        // Clear L2 cache entries
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith(l2StorageKey)) {
            localStorage.removeItem(key);
          }
        });
      }
    }
  };
}

/**
 * Cache invalidation strategies
 */
export function useCacheInvalidation<K>(cache: ReturnType<typeof useAdvancedCache<K, unknown>>) {
  const [dependencies, setDependencies] = useState(new Map<string, Set<string>>());

  const addDependency = useCallback((cacheKey: K, dependency: string) => {
    const keyStr = typeof cacheKey === 'string' ? cacheKey : JSON.stringify(cacheKey);
    setDependencies(prev => {
      const newDeps = new Map(prev);
      if (!newDeps.has(dependency)) {
        newDeps.set(dependency, new Set());
      }
      newDeps.get(dependency)!.add(keyStr);
      return newDeps;
    });
  }, []);

  const invalidateByDependency = useCallback((dependency: string) => {
    const affectedKeys = dependencies.get(dependency);
    if (affectedKeys) {
      affectedKeys.forEach(keyStr => {
        try {
          const key = JSON.parse(keyStr) as K;
          cache.delete(key);
        } catch {
          // If JSON.parse fails, treat as string key
          cache.delete(keyStr as unknown as K);
        }
      });
      
      setDependencies(prev => {
        const newDeps = new Map(prev);
        newDeps.delete(dependency);
        return newDeps;
      });
    }
  }, [dependencies, cache]);

  const invalidateByPattern = useCallback(() => {
    // This would require iterating through cache keys
    // Implementation depends on cache internal structure
    console.warn('Pattern invalidation not fully implemented');
  }, []);

  const invalidateByTag = useCallback((tag: string) => {
    invalidateByDependency(tag);
  }, [invalidateByDependency]);

  return {
    addDependency,
    invalidateByDependency,
    invalidateByPattern,
    invalidateByTag
  };
}

export default {
  useAdvancedCache,
  useMultiLevelCache,
  useCacheInvalidation
};
