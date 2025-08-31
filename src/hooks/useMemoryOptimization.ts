import { useCallback, useRef, useEffect } from 'react';

interface MemoryOptimizationConfig {
  maxCacheSize?: number;
  gcInterval?: number;
  weakRefSupport?: boolean;
}

/**
 * Memory optimization utilities for preventing leaks and efficient garbage collection
 */
export function useMemoryOptimization(config: MemoryOptimizationConfig = {}) {
  const { maxCacheSize = 1000, gcInterval = 30000, weakRefSupport = true } = config;
  
  const cacheRef = useRef(new Map());
  const weakCacheRef = useRef(weakRefSupport ? new WeakMap() : null);
  const gcIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const cleanupCache = useCallback(() => {
    const cache = cacheRef.current;
    
    if (cache.size > maxCacheSize) {
      const keysToDelete = Array.from(cache.keys()).slice(0, cache.size - maxCacheSize);
      keysToDelete.forEach(key => cache.delete(key));
    }
    
    // Force garbage collection if available
    if ('gc' in global && typeof global.gc === 'function') {
      global.gc();
    }
  }, [maxCacheSize]);

  const memoizeWeakly = useCallback(<T extends object, R>(
    fn: (obj: T) => R,
    obj: T
  ): R => {
    if (!weakCacheRef.current) {
      return fn(obj);
    }

    const cached = weakCacheRef.current.get(obj);
    if (cached !== undefined) {
      return cached;
    }

    const result = fn(obj);
    weakCacheRef.current.set(obj, result);
    return result;
  }, []);

  const createObjectPool = useCallback(<T>(
    factory: () => T,
    reset: (obj: T) => void,
    maxSize = 100
  ) => {
    const pool: T[] = [];
    
    return {
      acquire(): T {
        if (pool.length > 0) {
          return pool.pop()!;
        }
        return factory();
      },
      
      release(obj: T): void {
        if (pool.length < maxSize) {
          reset(obj);
          pool.push(obj);
        }
      },
      
      size(): number {
        return pool.length;
      },
      
      clear(): void {
        pool.length = 0;
      }
    };
  }, []);

  const monitorMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      if (memory) {
        return {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
          percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
        };
      }
    }
    return null;
  }, []);

  useEffect(() => {
    gcIntervalRef.current = setInterval(cleanupCache, gcInterval);
    
    return () => {
      if (gcIntervalRef.current) {
        clearInterval(gcIntervalRef.current);
      }
    };
  }, [cleanupCache, gcInterval]);

  return {
    memoizeWeakly,
    createObjectPool,
    monitorMemoryUsage,
    cleanupCache,
    getCacheSize: () => cacheRef.current.size
  };
}

/**
 * Lazy loading utilities for components and resources
 */
export function useLazyLoading() {
  const loadedResources = useRef(new Set<string>());
  const loadingPromises = useRef(new Map<string, Promise<unknown>>());

  const lazyLoadScript = useCallback((src: string): Promise<void> => {
    if (loadedResources.current.has(src)) {
      return Promise.resolve();
    }

    if (loadingPromises.current.has(src)) {
      return loadingPromises.current.get(src) as Promise<void>;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      script.onload = () => {
        loadedResources.current.add(src);
        loadingPromises.current.delete(src);
        resolve();
      };
      
      script.onerror = () => {
        loadingPromises.current.delete(src);
        reject(new Error(`Failed to load script: ${src}`));
      };
      
      document.head.appendChild(script);
    });

    loadingPromises.current.set(src, promise);
    return promise;
  }, []);

  const lazyLoadCSS = useCallback((href: string): Promise<void> => {
    if (loadedResources.current.has(href)) {
      return Promise.resolve();
    }

    if (loadingPromises.current.has(href)) {
      return loadingPromises.current.get(href) as Promise<void>;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      
      link.onload = () => {
        loadedResources.current.add(href);
        loadingPromises.current.delete(href);
        resolve();
      };
      
      link.onerror = () => {
        loadingPromises.current.delete(href);
        reject(new Error(`Failed to load CSS: ${href}`));
      };
      
      document.head.appendChild(link);
    });

    loadingPromises.current.set(href, promise);
    return promise;
  }, []);

  const preloadResource = useCallback((url: string, type: 'script' | 'style' | 'image' | 'fetch' = 'fetch'): Promise<void> => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      
      switch (type) {
        case 'script':
          link.as = 'script';
          break;
        case 'style':
          link.as = 'style';
          break;
        case 'image':
          link.as = 'image';
          break;
        case 'fetch':
          link.as = 'fetch';
          link.crossOrigin = 'anonymous';
          break;
      }
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to preload: ${url}`));
      
      document.head.appendChild(link);
    });
  }, []);

  return {
    lazyLoadScript,
    lazyLoadCSS,
    preloadResource,
    getLoadedCount: () => loadedResources.current.size,
    isLoaded: (resource: string) => loadedResources.current.has(resource)
  };
}

/**
 * Event listener optimization to prevent memory leaks
 */
export function useEventOptimization() {
  const listenersRef = useRef(new Map<string, Set<EventListenerOrEventListenerObject>>());

  const addOptimizedListener = useCallback((
    target: EventTarget,
    event: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions
  ) => {
    const key = `${target.constructor.name}-${event}`;
    
    if (!listenersRef.current.has(key)) {
      listenersRef.current.set(key, new Set());
    }
    
    const listeners = listenersRef.current.get(key)!;
    
    if (!listeners.has(listener)) {
      target.addEventListener(event, listener, options);
      listeners.add(listener);
    }

    return () => {
      target.removeEventListener(event, listener, options);
      listeners.delete(listener);
    };
  }, []);

  const removeAllListeners = useCallback(() => {
    listenersRef.current.clear();
  }, []);

  useEffect(() => {
    return () => {
      removeAllListeners();
    };
  }, [removeAllListeners]);

  return {
    addOptimizedListener,
    removeAllListeners,
    getListenerCount: () => {
      let total = 0;
      listenersRef.current.forEach(listeners => {
        total += listeners.size;
      });
      return total;
    }
  };
}

export default {
  useMemoryOptimization,
  useLazyLoading,
  useEventOptimization
};
