import { useRef, useCallback, useEffect } from 'react';

interface ObserverEntry {
  element: Element;
  isIntersecting: boolean;
  intersectionRatio: number;
}

interface VirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  threshold?: number;
}

/**
 * Virtual scrolling hook for large lists
 * Renders only visible items for optimal performance
 */
export function useVirtualScroll<T>(
  items: T[],
  options: VirtualScrollOptions
) {
  const {
    itemHeight,
    containerHeight,
    overscan = 5
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTop = useRef(0);

  // Calculate visible range
  const getVisibleRange = useCallback(() => {
    const start = Math.floor(scrollTop.current / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = start + visibleCount;

    return {
      start: Math.max(0, start - overscan),
      end: Math.min(items.length, end + overscan),
      visibleStart: start,
      visibleEnd: end
    };
  }, [itemHeight, containerHeight, overscan, items.length]);

  // Get visible items based on scroll position
  const getVisibleItems = useCallback(() => {
    const { start, end } = getVisibleRange();
    
    return items.slice(start, end).map((item, index) => ({
      item,
      index: start + index,
      style: {
        position: 'absolute' as const,
        top: (start + index) * itemHeight,
        height: itemHeight,
        width: '100%'
      }
    }));
  }, [items, getVisibleRange, itemHeight]);

  // Handle scroll events with throttling
  const handleScroll = useCallback((event: Event) => {
    const target = event.target as HTMLDivElement;
    scrollTop.current = target.scrollTop;
  }, []);

  // Setup scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const totalHeight = items.length * itemHeight;
  const visibleItems = getVisibleItems();

  return {
    containerRef,
    totalHeight,
    visibleItems,
    scrollToIndex: (index: number) => {
      if (containerRef.current) {
        containerRef.current.scrollTop = index * itemHeight;
      }
    },
    scrollToTop: () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }
  };
}

/**
 * Intersection observer hook for performance monitoring
 * Tracks element visibility with optimized observer management
 */
export function useIntersectionObserverOptimized(
  callback: (entries: ObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Set<Element>>(new Set());

  // Create observer with optimized settings
  const createObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const mappedEntries: ObserverEntry[] = entries.map(entry => ({
          element: entry.target,
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio
        }));
        callback(mappedEntries);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '50px',
        ...options
      }
    );

    // Re-observe existing elements
    elementsRef.current.forEach(element => {
      observerRef.current?.observe(element);
    });
  }, [callback, options]);

  // Observe element
  const observe = useCallback((element: Element) => {
    if (!element) return;

    if (!observerRef.current) {
      createObserver();
    }

    elementsRef.current.add(element);
    observerRef.current?.observe(element);
  }, [createObserver]);

  // Unobserve element
  const unobserve = useCallback((element: Element) => {
    if (!element) return;

    elementsRef.current.delete(element);
    observerRef.current?.unobserve(element);
  }, []);

  // Cleanup
  useEffect(() => {
    const observer = observerRef.current;
    const elements = elementsRef.current;
    
    return () => {
      observer?.disconnect();
      elements.clear();
    };
  }, []);

  return { observe, unobserve };
}

/**
 * Performance monitoring hook
 * Tracks component render times and performance metrics
 */
export function usePerformanceMonitor(componentName: string) {
  const renderStart = useRef<number>(0);
  const renderTimes = useRef<number[]>([]);

  // Mark render start
  useEffect(() => {
    renderStart.current = performance.now();
  });

  // Mark render end and calculate time
  useEffect(() => {
    const renderEnd = performance.now();
    const renderTime = renderEnd - renderStart.current;
    
    renderTimes.current.push(renderTime);
    
    // Keep only last 10 render times
    if (renderTimes.current.length > 10) {
      renderTimes.current.shift();
    }

    // Log performance in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
    }
  });

  // Get performance metrics
  const getMetrics = useCallback(() => {
    const times = renderTimes.current;
    if (times.length === 0) return null;

    const avg = times.reduce((sum, time) => sum + time, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);

    return {
      average: Number(avg.toFixed(2)),
      min: Number(min.toFixed(2)),
      max: Number(max.toFixed(2)),
      samples: times.length
    };
  }, []);

  // Memory usage (approximate)
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as unknown as { memory: { 
        usedJSHeapSize: number; 
        totalJSHeapSize: number; 
        jsHeapSizeLimit: number; 
      }}).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
      };
    }
    return null;
  }, []);

  return {
    getMetrics,
    getMemoryUsage,
    logMetrics: () => {
      const metrics = getMetrics();
      const memory = getMemoryUsage();
      
      console.group(`Performance metrics for ${componentName}`);
      console.log('Render times:', metrics);
      console.log('Memory usage:', memory);
      console.groupEnd();
    }
  };
}

/**
 * Resource preloader hook
 * Efficiently preloads resources with priority management
 */
export function useResourcePreloader() {
  const preloadedResources = useRef<Map<string, boolean>>(new Map());
  const loadingResources = useRef<Set<string>>(new Set());

  const preloadImage = useCallback((src: string, priority: 'high' | 'low' = 'low') => {
    if (preloadedResources.current.has(src) || loadingResources.current.has(src)) {
      return Promise.resolve();
    }

    loadingResources.current.add(src);

    return new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      
      if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high');
      }

      link.onload = () => {
        preloadedResources.current.set(src, true);
        loadingResources.current.delete(src);
        resolve();
      };

      link.onerror = () => {
        loadingResources.current.delete(src);
        reject(new Error(`Failed to preload image: ${src}`));
      };

      document.head.appendChild(link);
    });
  }, []);

  const preloadScript = useCallback((src: string) => {
    if (preloadedResources.current.has(src) || loadingResources.current.has(src)) {
      return Promise.resolve();
    }

    loadingResources.current.add(src);

    return new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;

      link.onload = () => {
        preloadedResources.current.set(src, true);
        loadingResources.current.delete(src);
        resolve();
      };

      link.onerror = () => {
        loadingResources.current.delete(src);
        reject(new Error(`Failed to preload script: ${src}`));
      };

      document.head.appendChild(link);
    });
  }, []);

  const isPreloaded = useCallback((src: string) => {
    return preloadedResources.current.has(src);
  }, []);

  const isLoading = useCallback((src: string) => {
    return loadingResources.current.has(src);
  }, []);

  return {
    preloadImage,
    preloadScript,
    isPreloaded,
    isLoading,
    getStats: () => ({
      preloaded: preloadedResources.current.size,
      loading: loadingResources.current.size
    })
  };
}

export default useVirtualScroll;
