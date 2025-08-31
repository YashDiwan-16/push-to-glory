/**
 * Advanced algorithm optimization utilities
 * Implements efficient algorithms for common operations
 */

/**
 * Binary search implementation for sorted arrays
 */
export class BinarySearchUtils {
  /**
   * Find exact value in sorted array
   */
  static findExact<T>(array: T[], target: T, compareFn?: (a: T, b: T) => number): number {
    let left = 0;
    let right = array.length - 1;

    const compare = compareFn || ((a: T, b: T) => {
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

    return -1; // Not found
  }

  /**
   * Find the insertion point for a value in sorted array
   */
  static findInsertionPoint<T>(array: T[], target: T, compareFn?: (a: T, b: T) => number): number {
    let left = 0;
    let right = array.length;

    const compare = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      if (compare(array[mid], target) < 0) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  /**
   * Find range of values equal to target
   */
  static findRange<T>(array: T[], target: T, compareFn?: (a: T, b: T) => number): [number, number] {
    const leftBound = this.findLeftBound(array, target, compareFn);
    if (leftBound === -1) return [-1, -1];
    
    const rightBound = this.findRightBound(array, target, compareFn);
    return [leftBound, rightBound];
  }

  private static findLeftBound<T>(array: T[], target: T, compareFn?: (a: T, b: T) => number): number {
    let left = 0;
    let right = array.length - 1;
    let result = -1;

    const compare = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const comparison = compare(array[mid], target);

      if (comparison === 0) {
        result = mid;
        right = mid - 1; // Continue searching left
      } else if (comparison < 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }

  private static findRightBound<T>(array: T[], target: T, compareFn?: (a: T, b: T) => number): number {
    let left = 0;
    let right = array.length - 1;
    let result = -1;

    const compare = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const comparison = compare(array[mid], target);

      if (comparison === 0) {
        result = mid;
        left = mid + 1; // Continue searching right
      } else if (comparison < 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }
}

/**
 * Optimized sorting algorithms for different use cases
 */
export class SortingAlgorithms {
  /**
   * Quick sort implementation (average O(n log n))
   */
  static quickSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const compare = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    if (array.length <= 1) return [...array];

    const result = [...array];
    this.quickSortInPlace(result, 0, result.length - 1, compare);
    return result;
  }

  private static quickSortInPlace<T>(
    array: T[], 
    low: number, 
    high: number, 
    compare: (a: T, b: T) => number
  ): void {
    if (low < high) {
      const pivotIndex = this.partition(array, low, high, compare);
      this.quickSortInPlace(array, low, pivotIndex - 1, compare);
      this.quickSortInPlace(array, pivotIndex + 1, high, compare);
    }
  }

  private static partition<T>(
    array: T[], 
    low: number, 
    high: number, 
    compare: (a: T, b: T) => number
  ): number {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (compare(array[j], pivot) <= 0) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
  }

  /**
   * Merge sort implementation (guaranteed O(n log n))
   */
  static mergeSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const compare = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    if (array.length <= 1) return [...array];

    const mid = Math.floor(array.length / 2);
    const left = this.mergeSort(array.slice(0, mid), compare);
    const right = this.mergeSort(array.slice(mid), compare);

    return this.merge(left, right, compare);
  }

  private static merge<T>(
    left: T[], 
    right: T[], 
    compare: (a: T, b: T) => number
  ): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (compare(left[leftIndex], right[rightIndex]) <= 0) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  /**
   * Radix sort for numbers (O(d * n) where d is number of digits)
   */
  static radixSort(array: number[]): number[] {
    if (array.length <= 1) return [...array];

    const max = Math.max(...array);
    const maxDigits = Math.floor(Math.log10(Math.abs(max))) + 1;
    
    let result = [...array];

    for (let digit = 0; digit < maxDigits; digit++) {
      result = this.countingSortByDigit(result, digit);
    }

    return result;
  }

  private static countingSortByDigit(array: number[], digit: number): number[] {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    const divisor = Math.pow(10, digit);

    for (const num of array) {
      const digitValue = Math.floor(Math.abs(num) / divisor) % 10;
      buckets[digitValue].push(num);
    }

    return buckets.flat();
  }
}

/**
 * Graph algorithms for relationship and dependency analysis
 */
export class GraphAlgorithms {
  /**
   * Topological sort for dependency resolution
   */
  static topologicalSort<T>(
    nodes: T[], 
    edges: Array<[T, T]>,
    keyFn?: (node: T) => string
  ): T[] | null {
    const getKey = keyFn || ((node: T) => String(node));
    const nodeKeys = nodes.map(getKey);
    const adjacencyList = new Map<string, string[]>();
    const inDegree = new Map<string, number>();

    // Initialize
    for (const key of nodeKeys) {
      adjacencyList.set(key, []);
      inDegree.set(key, 0);
    }

    // Build graph
    for (const [from, to] of edges) {
      const fromKey = getKey(from);
      const toKey = getKey(to);
      
      adjacencyList.get(fromKey)?.push(toKey);
      inDegree.set(toKey, (inDegree.get(toKey) || 0) + 1);
    }

    // Kahn's algorithm
    const queue: string[] = [];
    const result: string[] = [];

    // Find nodes with no incoming edges
    for (const [key, degree] of inDegree) {
      if (degree === 0) {
        queue.push(key);
      }
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);

      // Remove current node and update in-degrees
      for (const neighbor of adjacencyList.get(current) || []) {
        const newDegree = (inDegree.get(neighbor) || 0) - 1;
        inDegree.set(neighbor, newDegree);

        if (newDegree === 0) {
          queue.push(neighbor);
        }
      }
    }

    // Check for cycles
    if (result.length !== nodes.length) {
      return null; // Cycle detected
    }

    // Map back to original nodes
    const keyToNode = new Map<string, T>();
    for (const node of nodes) {
      keyToNode.set(getKey(node), node);
    }

    return result.map(key => keyToNode.get(key)!);
  }

  /**
   * Find strongly connected components using Tarjan's algorithm
   */
  static findStronglyConnectedComponents<T>(
    nodes: T[],
    edges: Array<[T, T]>,
    keyFn?: (node: T) => string
  ): T[][] {
    const getKey = keyFn || ((node: T) => String(node));
    const adjacencyList = new Map<string, string[]>();
    
    // Build adjacency list
    for (const node of nodes) {
      adjacencyList.set(getKey(node), []);
    }
    
    for (const [from, to] of edges) {
      adjacencyList.get(getKey(from))?.push(getKey(to));
    }

    const visited = new Set<string>();
    const low = new Map<string, number>();
    const disc = new Map<string, number>();
    const stack: string[] = [];
    const stackMember = new Set<string>();
    const components: string[][] = [];
    let time = 0;

    const tarjanDFS = (nodeKey: string): void => {
      disc.set(nodeKey, time);
      low.set(nodeKey, time);
      time++;
      stack.push(nodeKey);
      stackMember.add(nodeKey);

      for (const neighborKey of adjacencyList.get(nodeKey) || []) {
        if (!disc.has(neighborKey)) {
          tarjanDFS(neighborKey);
          low.set(nodeKey, Math.min(low.get(nodeKey)!, low.get(neighborKey)!));
        } else if (stackMember.has(neighborKey)) {
          low.set(nodeKey, Math.min(low.get(nodeKey)!, disc.get(neighborKey)!));
        }
      }

      // If nodeKey is a root node, pop the stack and create component
      if (low.get(nodeKey) === disc.get(nodeKey)) {
        const component: string[] = [];
        let poppedKey: string;
        
        do {
          poppedKey = stack.pop()!;
          stackMember.delete(poppedKey);
          component.push(poppedKey);
        } while (poppedKey !== nodeKey);
        
        components.push(component);
      }
    };

    for (const node of nodes) {
      const nodeKey = getKey(node);
      if (!visited.has(nodeKey)) {
        visited.add(nodeKey);
        tarjanDFS(nodeKey);
      }
    }

    // Map back to original nodes
    const keyToNode = new Map<string, T>();
    for (const node of nodes) {
      keyToNode.set(getKey(node), node);
    }

    return components.map(component => 
      component.map(key => keyToNode.get(key)!)
    );
  }
}

/**
 * Dynamic programming utilities for optimization problems
 */
export class DynamicProgramming {
  /**
   * Longest Common Subsequence (LCS)
   */
  static longestCommonSubsequence<T>(
    seq1: T[], 
    seq2: T[],
    equalsFn?: (a: T, b: T) => boolean
  ): T[] {
    const equals = equalsFn || ((a: T, b: T) => a === b);
    const m = seq1.length;
    const n = seq2.length;
    
    // Create DP table
    const dp: number[][] = Array.from({ length: m + 1 }, () => 
      Array(n + 1).fill(0)
    );

    // Fill DP table
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (equals(seq1[i - 1], seq2[j - 1])) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    // Reconstruct LCS
    const lcs: T[] = [];
    let i = m;
    let j = n;

    while (i > 0 && j > 0) {
      if (equals(seq1[i - 1], seq2[j - 1])) {
        lcs.unshift(seq1[i - 1]);
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    return lcs;
  }

  /**
   * Edit distance (Levenshtein distance) between two sequences
   */
  static editDistance<T>(
    seq1: T[], 
    seq2: T[],
    equalsFn?: (a: T, b: T) => boolean
  ): number {
    const equals = equalsFn || ((a: T, b: T) => a === b);
    const m = seq1.length;
    const n = seq2.length;

    // Create DP table
    const dp: number[][] = Array.from({ length: m + 1 }, (_, i) => 
      Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : (j === 0 ? i : 0))
    );

    // Fill DP table
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (equals(seq1[i - 1], seq2[j - 1])) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(
            dp[i - 1][j],     // deletion
            dp[i][j - 1],     // insertion
            dp[i - 1][j - 1]  // substitution
          );
        }
      }
    }

    return dp[m][n];
  }

  /**
   * Knapsack problem solver (0/1 variant)
   */
  static knapsack(
    items: Array<{ weight: number; value: number }>,
    capacity: number
  ): { maxValue: number; selectedItems: number[] } {
    const n = items.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () => 
      Array(capacity + 1).fill(0)
    );

    // Fill DP table
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - items[i - 1].weight] + items[i - 1].value
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // Reconstruct solution
    const selectedItems: number[] = [];
    let w = capacity;
    
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selectedItems.push(i - 1);
        w -= items[i - 1].weight;
      }
    }

    return {
      maxValue: dp[n][capacity],
      selectedItems: selectedItems.reverse()
    };
  }
}

export default {
  BinarySearchUtils,
  SortingAlgorithms,
  GraphAlgorithms,
  DynamicProgramming
};
