import { useState, useCallback } from 'react';

export interface PaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationActions {
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  reset: () => void;
}

/**
 * Custom hook for pagination logic
 * Provides state and actions for pagination controls
 */
export function usePagination(
  totalItems: number,
  options: PaginationOptions = {}
): [PaginationState, PaginationActions] {
  const { initialPage = 1, pageSize: initialPageSize = 10 } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [totalItemsState, setTotalItemsState] = useState(totalItems);

  const totalPages = Math.ceil(totalItemsState / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasNextPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [hasPreviousPage]);

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size);
    setCurrentPage(1); // Reset to first page when page size changes
  }, []);

  const setTotalItems = useCallback((total: number) => {
    setTotalItemsState(total);
    // Adjust current page if it's now out of bounds
    const newTotalPages = Math.ceil(total / pageSize);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [currentPage, pageSize]);

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSizeState(initialPageSize);
  }, [initialPage, initialPageSize]);

  const state: PaginationState = {
    currentPage,
    pageSize,
    totalItems: totalItemsState,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };

  const actions: PaginationActions = {
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    setTotalItems,
    reset,
  };

  return [state, actions];
}

export default usePagination;
