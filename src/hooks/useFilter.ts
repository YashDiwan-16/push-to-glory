import { useMemo } from 'react';

export interface FilterConfig {
  [key: string]: {
    value: unknown;
    operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
  };
}

/**
 * Custom hook for filtering arrays with multiple criteria
 * Provides optimized filtering with various operators
 */
export function useFilter<T extends Record<string, unknown>>(
  items: T[],
  filters: FilterConfig
): T[] {
  const filteredItems = useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) {
      return items;
    }

    return items.filter(item => {
      return Object.entries(filters).every(([key, filterConfig]) => {
        const itemValue = item[key];
        const filterObj = filterConfig as { value: unknown; operator: string };
        const { value: filterValue, operator } = filterObj;

        if (filterValue === null || filterValue === undefined || filterValue === '') {
          return true; // Don't filter if filter value is empty
        }

        if (itemValue === null || itemValue === undefined) {
          return false; // Item doesn't have this property
        }

        switch (operator) {
          case 'equals':
            return itemValue === filterValue;

          case 'contains':
            return String(itemValue)
              .toLowerCase()
              .includes(String(filterValue).toLowerCase());

          case 'startsWith':
            return String(itemValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase());

          case 'endsWith':
            return String(itemValue)
              .toLowerCase()
              .endsWith(String(filterValue).toLowerCase());

          case 'gt':
            if (typeof itemValue === 'number' && typeof filterValue === 'number') {
              return itemValue > filterValue;
            }
            if (itemValue instanceof Date && filterValue instanceof Date) {
              return itemValue.getTime() > filterValue.getTime();
            }
            return String(itemValue) > String(filterValue);

          case 'lt':
            if (typeof itemValue === 'number' && typeof filterValue === 'number') {
              return itemValue < filterValue;
            }
            if (itemValue instanceof Date && filterValue instanceof Date) {
              return itemValue.getTime() < filterValue.getTime();
            }
            return String(itemValue) < String(filterValue);

          case 'gte':
            if (typeof itemValue === 'number' && typeof filterValue === 'number') {
              return itemValue >= filterValue;
            }
            if (itemValue instanceof Date && filterValue instanceof Date) {
              return itemValue.getTime() >= filterValue.getTime();
            }
            return String(itemValue) >= String(filterValue);

          case 'lte':
            if (typeof itemValue === 'number' && typeof filterValue === 'number') {
              return itemValue <= filterValue;
            }
            if (itemValue instanceof Date && filterValue instanceof Date) {
              return itemValue.getTime() <= filterValue.getTime();
            }
            return String(itemValue) <= String(filterValue);

          default:
            return true;
        }
      });
    });
  }, [items, filters]);

  return filteredItems;
}

export default useFilter;
