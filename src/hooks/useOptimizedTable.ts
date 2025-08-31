import { useMemo, useCallback } from 'react';
import { ArrayUtils } from '../lib/performance';

export interface TableSortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

export interface TablePaginationConfig {
  page: number;
  pageSize: number;
}

interface UseOptimizedTableOptions<T> {
  initialSort?: TableSortConfig<T>;
  initialPage?: number;
  pageSize?: number;
  enableVirtualization?: boolean;
}

/**
 * Optimized table hook with sorting, filtering, and pagination
 * Uses efficient algorithms for large datasets
 */
export function useOptimizedTable<T extends Record<string, unknown>>(
  data: T[],
  options: UseOptimizedTableOptions<T> = {}
) {
  const {
    initialSort,
    initialPage = 1,
    pageSize = 20,
    enableVirtualization = false
  } = options;

  // Memoized sorted data using efficient comparison
  const sortedData = useMemo(() => {
    if (!initialSort) return data;

    const { key, direction } = initialSort;
    
    // Use native sort with optimized comparator
    return [...data].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      let comparison = 0;
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else if (aVal instanceof Date && bVal instanceof Date) {
        comparison = aVal.getTime() - bVal.getTime();
      } else {
        const aStr = String(aVal || '').toLowerCase();
        const bStr = String(bVal || '').toLowerCase();
        comparison = aStr.localeCompare(bStr);
      }
      
      return direction === 'desc' ? -comparison : comparison;
    });
  }, [data, initialSort]);

  // Efficient filtering using Map for lookups
  const filteredData = useMemo(() => {
    return sortedData; // Placeholder for filtering logic
  }, [sortedData]);

  // Optimized pagination using slice
  const paginatedData = useMemo(() => {
    const startIndex = (initialPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, initialPage, pageSize]);

  // Virtual scrolling data for large datasets
  const virtualizedData = useMemo(() => {
    if (!enableVirtualization) return paginatedData;
    
    // Calculate visible items based on scroll position
    // This would be connected to a scroll position hook
    return paginatedData;
  }, [paginatedData, enableVirtualization]);

  // Column statistics for insights
  const columnStats = useMemo(() => {
    const stats = new Map<keyof T, { 
      unique: number; 
      nulls: number; 
      type: string;
    }>();

    if (data.length === 0) return stats;

    // Get all unique keys efficiently
    const keys = ArrayUtils.unique(
      data.flatMap(item => Object.keys(item))
    ) as (keyof T)[];

    keys.forEach(key => {
      const values = data.map(item => item[key]).filter(val => val != null);
      const uniqueValues = new Set(values);

      stats.set(key, {
        unique: uniqueValues.size,
        nulls: data.length - values.length,
        type: values.length > 0 ? typeof values[0] : 'unknown',
      });
    });

    return stats;
  }, [data]);

  // Efficient grouping using Map
  const groupData = useCallback(<K extends keyof T>(groupKey: K) => {
    return ArrayUtils.groupBy(filteredData, item => item[groupKey]);
  }, [filteredData]);

  // Simplified aggregate calculations
  const calculateAggregates = useCallback((
    column: keyof T,
    operations: ('sum' | 'avg' | 'min' | 'max' | 'count')[]
  ) => {
    const values = filteredData
      .map(item => item[column])
      .filter(val => typeof val === 'number') as number[];

    const results: Record<string, number> = {};

    operations.forEach(op => {
      switch (op) {
        case 'sum':
          results.sum = ArrayUtils.sum(values);
          break;
        case 'avg':
          results.avg = ArrayUtils.average(values);
          break;
        case 'min':
        case 'max': {
          const minMax = ArrayUtils.minMax(values);
          if (minMax) {
            results.min = minMax.min;
            results.max = minMax.max;
          }
          break;
        }
        case 'count':
          results.count = values.length;
          break;
      }
    });

    return results;
  }, [filteredData]);

  // Export data functionality
  const exportData = useCallback((
    format: 'csv' | 'json' | 'tsv' = 'csv',
    filename?: string
  ) => {
    const dataToExport = filteredData;
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json'
      });
      downloadBlob(blob, filename || 'data.json');
    } else {
      const separator = format === 'tsv' ? '\t' : ',';
      const headers = Object.keys(dataToExport[0] || {});
      const csvContent = [
        headers.join(separator),
        ...dataToExport.map(row => 
          headers.map(header => {
            const value = row[header];
            const stringValue = String(value || '');
            // Escape quotes and wrap in quotes if contains separator
            return stringValue.includes(separator) || stringValue.includes('"')
              ? `"${stringValue.replace(/"/g, '""')}"`
              : stringValue;
          }).join(separator)
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      downloadBlob(blob, filename || `data.${format}`);
    }
  }, [filteredData]);

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Performance metrics
  const metrics = useMemo(() => ({
    totalRows: data.length,
    filteredRows: filteredData.length,
    visibleRows: virtualizedData.length,
    columns: columnStats.size,
    memoryUsage: JSON.stringify(data).length, // Rough estimate
  }), [filteredData.length, virtualizedData.length, columnStats.size, data]);

  return {
    // Data
    data: virtualizedData,
    originalData: data,
    filteredData,
    
    // Statistics
    columnStats,
    metrics,
    
    // Operations
    groupData,
    calculateAggregates,
    exportData,
    
    // Pagination info
    pagination: {
      currentPage: initialPage,
      pageSize,
      totalPages: Math.ceil(filteredData.length / pageSize),
      totalItems: filteredData.length,
    }
  };
}

export default useOptimizedTable;
