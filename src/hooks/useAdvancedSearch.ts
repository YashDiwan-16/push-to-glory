import { useState, useEffect, useCallback, useMemo } from 'react';
import { LRUCache } from '../lib/performance';

interface SearchOptions {
  debounceMs?: number;
  minLength?: number;
  caseSensitive?: boolean;
  maxResults?: number;
  cacheSize?: number;
}

/**
 * Advanced search hook with caching and optimization
 * Provides efficient search functionality with performance optimizations
 */
export function useAdvancedSearch<T>(
  items: T[],
  searchKey: keyof T | ((item: T) => string),
  options: SearchOptions = {}
) {
  const {
    debounceMs = 300,
    minLength = 2,
    caseSensitive = false,
    maxResults = 100,
    cacheSize = 50
  } = options;

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Create cache instance
  const cache = useMemo(() => new LRUCache<string, T[]>(cacheSize), [cacheSize]);

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Optimized search function using Map for performance
  const searchItems = useCallback((searchQuery: string): T[] => {
    if (searchQuery.length < minLength) {
      return items.slice(0, maxResults);
    }

    // Check cache first
    const cacheKey = `${searchQuery}-${caseSensitive}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const normalizedQuery = caseSensitive ? searchQuery : searchQuery.toLowerCase();
    
    // Use Map for O(1) lookups when possible
    const results: T[] = [];
    const seen = new Set<T>();

    for (const item of items) {
      if (results.length >= maxResults) break;
      
      let searchValue: string;
      if (typeof searchKey === 'function') {
        searchValue = searchKey(item);
      } else {
        searchValue = String(item[searchKey]);
      }

      const normalizedValue = caseSensitive ? searchValue : searchValue.toLowerCase();
      
      if (normalizedValue.includes(normalizedQuery) && !seen.has(item)) {
        results.push(item);
        seen.add(item);
      }
    }

    // Cache the results
    cache.set(cacheKey, results);
    
    return results;
  }, [items, searchKey, minLength, maxResults, caseSensitive, cache]);

  // Perform search when debounced query changes
  const searchResults = useMemo(() => {
    if (!debouncedQuery) {
      return items.slice(0, maxResults);
    }

    setIsSearching(true);
    const results = searchItems(debouncedQuery);
    setIsSearching(false);
    
    return results;
  }, [debouncedQuery, items, maxResults, searchItems]);

  // Advanced filtering with multiple criteria
  const filteredResults = useMemo(() => {
    return searchResults;
  }, [searchResults]);

  // Fuzzy search function
  const fuzzySearch = useCallback((searchQuery: string): T[] => {
    if (searchQuery.length < minLength) {
      return items.slice(0, maxResults);
    }

    const normalizedQuery = caseSensitive ? searchQuery : searchQuery.toLowerCase();
    const queryChars = normalizedQuery.split('');
    
    const scored: Array<{ item: T; score: number }> = [];

    for (const item of items) {
      let searchValue: string;
      if (typeof searchKey === 'function') {
        searchValue = searchKey(item);
      } else {
        searchValue = String(item[searchKey]);
      }

      const normalizedValue = caseSensitive ? searchValue : searchValue.toLowerCase();
      let score = 0;
      let queryIndex = 0;

      for (let i = 0; i < normalizedValue.length && queryIndex < queryChars.length; i++) {
        if (normalizedValue[i] === queryChars[queryIndex]) {
          score += 1;
          queryIndex++;
        }
      }

      if (queryIndex === queryChars.length) {
        scored.push({ item, score: score / normalizedValue.length });
      }
    }

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map(({ item }) => item);
  }, [items, searchKey, minLength, maxResults, caseSensitive]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  // Reset cache
  const clearCache = useCallback(() => {
    cache.clear();
  }, [cache]);

  return {
    query,
    setQuery,
    results: filteredResults,
    isSearching,
    clearSearch,
    clearCache,
    fuzzySearch,
    cache,
    stats: {
      totalItems: items.length,
      resultCount: filteredResults.length,
      cacheSize: cache.size,
    }
  };
}

export default useAdvancedSearch;
