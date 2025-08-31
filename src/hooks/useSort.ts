import { useState, useCallback, useMemo } from 'react';

export interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

export interface SortActions<T> {
  requestSort: (key: keyof T) => void;
  clearSort: () => void;
  setSortConfig: (config: SortConfig<T> | null) => void;
}

/**
 * Custom hook for sorting arrays of objects
 * Provides sorting state and actions with type safety
 */
export function useSort<T extends Record<string, unknown>>(
  items: T[],
  initialSortConfig?: SortConfig<T>
): [T[], SortConfig<T> | null, SortActions<T>] {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(
    initialSortConfig || null
  );

  const sortedItems = useMemo(() => {
    if (!sortConfig) {
      return items;
    }

    return [...items].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) {
        return 0;
      }

      if (aValue == null) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }

      if (bValue == null) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }

      let comparison = 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        // Fallback to string comparison
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [items, sortConfig]);

  const requestSort = useCallback((key: keyof T) => {
    setSortConfig(prevConfig => {
      if (prevConfig && prevConfig.key === key) {
        // If clicking the same column, toggle direction
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        // If clicking a new column, default to ascending
        return {
          key,
          direction: 'asc',
        };
      }
    });
  }, []);

  const clearSort = useCallback(() => {
    setSortConfig(null);
  }, []);

  const setSortConfigCallback = useCallback((config: SortConfig<T> | null) => {
    setSortConfig(config);
  }, []);

  const actions: SortActions<T> = {
    requestSort,
    clearSort,
    setSortConfig: setSortConfigCallback,
  };

  return [sortedItems, sortConfig, actions];
}

export default useSort;
