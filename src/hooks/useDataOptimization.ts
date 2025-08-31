import { useMemo, useCallback, useState } from 'react';

/**
 * Optimized data structures hook for efficient operations
 */

interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  value?: unknown;
}

/**
 * Trie data structure for efficient string operations
 */
class TrieDataStructure {
  private root: TrieNode;

  constructor() {
    this.root = {
      children: new Map(),
      isEndOfWord: false
    };
  }

  insert(word: string, value?: unknown): void {
    let current = this.root;
    
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, {
          children: new Map(),
          isEndOfWord: false
        });
      }
      current = current.children.get(char)!;
    }
    
    current.isEndOfWord = true;
    if (value !== undefined) {
      current.value = value;
    }
  }

  search(word: string): { found: boolean; value?: unknown } {
    let current = this.root;
    
    for (const char of word) {
      if (!current.children.has(char)) {
        return { found: false };
      }
      current = current.children.get(char)!;
    }
    
    return { 
      found: current.isEndOfWord, 
      value: current.value 
    };
  }

  startsWith(prefix: string): boolean {
    let current = this.root;
    
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }
    
    return true;
  }

  findWordsWithPrefix(prefix: string): string[] {
    let current = this.root;
    
    // Navigate to prefix end
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return [];
      }
      current = current.children.get(char)!;
    }
    
    // DFS to find all words
    const words: string[] = [];
    
    const dfs = (node: TrieNode, currentWord: string) => {
      if (node.isEndOfWord) {
        words.push(currentWord);
      }
      
      for (const [char, childNode] of node.children) {
        dfs(childNode, currentWord + char);
      }
    };
    
    dfs(current, prefix);
    return words;
  }

  delete(word: string): boolean {
    const deleteHelper = (node: TrieNode, word: string, index: number): boolean => {
      if (index === word.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;
        return node.children.size === 0;
      }
      
      const char = word[index];
      const childNode = node.children.get(char);
      
      if (!childNode) return false;
      
      const shouldDeleteChild = deleteHelper(childNode, word, index + 1);
      
      if (shouldDeleteChild) {
        node.children.delete(char);
        return node.children.size === 0 && !node.isEndOfWord;
      }
      
      return false;
    };
    
    return deleteHelper(this.root, word, 0);
  }
}

/**
 * Bloom filter for probabilistic membership testing
 */
class BloomFilter {
  private bitArray: boolean[];
  private size: number;
  private hashFunctions: Array<(item: string) => number>;

  constructor(expectedElements: number, falsePositiveRate: number = 0.01) {
    this.size = Math.ceil(
      (-expectedElements * Math.log(falsePositiveRate)) / Math.pow(Math.log(2), 2)
    );
    this.bitArray = new Array(this.size).fill(false);
    
    const numHashFunctions = Math.ceil((this.size / expectedElements) * Math.log(2));
    this.hashFunctions = this.createHashFunctions(numHashFunctions);
  }

  private createHashFunctions(count: number): Array<(item: string) => number> {
    const functions: Array<(item: string) => number> = [];
    
    for (let i = 0; i < count; i++) {
      functions.push((item: string) => {
        let hash = 0;
        for (let j = 0; j < item.length; j++) {
          hash = ((hash << 5) + hash + item.charCodeAt(j) + i) % this.size;
        }
        return Math.abs(hash);
      });
    }
    
    return functions;
  }

  add(item: string): void {
    for (const hashFn of this.hashFunctions) {
      const index = hashFn(item);
      this.bitArray[index] = true;
    }
  }

  mightContain(item: string): boolean {
    for (const hashFn of this.hashFunctions) {
      const index = hashFn(item);
      if (!this.bitArray[index]) {
        return false;
      }
    }
    return true;
  }

  clear(): void {
    this.bitArray.fill(false);
  }
}

/**
 * Disjoint Set (Union-Find) data structure
 */
class DisjointSet<T> {
  private parent: Map<T, T>;
  private rank: Map<T, number>;

  constructor() {
    this.parent = new Map();
    this.rank = new Map();
  }

  makeSet(item: T): void {
    this.parent.set(item, item);
    this.rank.set(item, 0);
  }

  find(item: T): T | undefined {
    if (!this.parent.has(item)) {
      return undefined;
    }

    // Path compression
    if (this.parent.get(item) !== item) {
      const root = this.find(this.parent.get(item)!);
      if (root) {
        this.parent.set(item, root);
      }
    }

    return this.parent.get(item);
  }

  union(item1: T, item2: T): boolean {
    const root1 = this.find(item1);
    const root2 = this.find(item2);

    if (!root1 || !root2 || root1 === root2) {
      return false;
    }

    // Union by rank
    const rank1 = this.rank.get(root1) || 0;
    const rank2 = this.rank.get(root2) || 0;

    if (rank1 < rank2) {
      this.parent.set(root1, root2);
    } else if (rank1 > rank2) {
      this.parent.set(root2, root1);
    } else {
      this.parent.set(root2, root1);
      this.rank.set(root1, rank1 + 1);
    }

    return true;
  }

  isConnected(item1: T, item2: T): boolean {
    const root1 = this.find(item1);
    const root2 = this.find(item2);
    return root1 !== undefined && root2 !== undefined && root1 === root2;
  }

  getComponents(): T[][] {
    const components = new Map<T, T[]>();

    for (const item of this.parent.keys()) {
      const root = this.find(item);
      if (root) {
        if (!components.has(root)) {
          components.set(root, []);
        }
        components.get(root)!.push(item);
      }
    }

    return Array.from(components.values());
  }
}

/**
 * Segment Tree for range queries
 */
class SegmentTree {
  private tree: number[];
  private n: number;

  constructor(array: number[]) {
    this.n = array.length;
    this.tree = new Array(4 * this.n);
    this.build(array, 0, 0, this.n - 1);
  }

  private build(array: number[], node: number, start: number, end: number): void {
    if (start === end) {
      this.tree[node] = array[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      this.build(array, 2 * node + 1, start, mid);
      this.build(array, 2 * node + 2, mid + 1, end);
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }
  }

  update(index: number, value: number): void {
    this.updateHelper(0, 0, this.n - 1, index, value);
  }

  private updateHelper(
    node: number,
    start: number,
    end: number,
    index: number,
    value: number
  ): void {
    if (start === end) {
      this.tree[node] = value;
    } else {
      const mid = Math.floor((start + end) / 2);
      if (index <= mid) {
        this.updateHelper(2 * node + 1, start, mid, index, value);
      } else {
        this.updateHelper(2 * node + 2, mid + 1, end, index, value);
      }
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }
  }

  query(left: number, right: number): number {
    return this.queryHelper(0, 0, this.n - 1, left, right);
  }

  private queryHelper(
    node: number,
    start: number,
    end: number,
    left: number,
    right: number
  ): number {
    if (right < start || end < left) {
      return 0;
    }
    if (left <= start && end <= right) {
      return this.tree[node];
    }
    const mid = Math.floor((start + end) / 2);
    const leftSum = this.queryHelper(2 * node + 1, start, mid, left, right);
    const rightSum = this.queryHelper(2 * node + 2, mid + 1, end, left, right);
    return leftSum + rightSum;
  }
}

/**
 * Hook for optimized data structures
 */
export function useOptimizedDataStructures() {
  const [structures] = useState(() => ({
    trie: new TrieDataStructure(),
    bloomFilter: new BloomFilter(1000),
    disjointSet: new DisjointSet<string>(),
    segmentTree: null as SegmentTree | null
  }));

  const createTrie = useCallback(() => {
    return new TrieDataStructure();
  }, []);

  const createBloomFilter = useCallback((expectedElements: number, falsePositiveRate?: number) => {
    return new BloomFilter(expectedElements, falsePositiveRate);
  }, []);

  const createDisjointSet = useCallback(<T>() => {
    return new DisjointSet<T>();
  }, []);

  const createSegmentTree = useCallback((array: number[]) => {
    return new SegmentTree(array);
  }, []);

  return {
    structures,
    createTrie,
    createBloomFilter,
    createDisjointSet,
    createSegmentTree
  };
}

/**
 * Hook for efficient data transformations
 */
export function useDataTransformations<T>() {
  const transformations = useMemo(() => ({
    /**
     * Group data by multiple keys
     */
    groupByMultiple: (
      data: T[],
      keyFns: Array<(item: T) => string>
    ): Map<string, T[]> => {
      const groups = new Map<string, T[]>();

      for (const item of data) {
        const compositeKey = keyFns.map(fn => fn(item)).join('|');
        if (!groups.has(compositeKey)) {
          groups.set(compositeKey, []);
        }
        groups.get(compositeKey)!.push(item);
      }

      return groups;
    },

    /**
     * Partition data into chunks with balanced sizes
     */
    balancedPartition: (data: T[], numPartitions: number): T[][] => {
      const partitions: T[][] = Array.from({ length: numPartitions }, () => []);
      const partitionSizes = new Array(numPartitions).fill(0);

      // Sort by some criteria if needed, here we'll just distribute evenly
      for (let i = 0; i < data.length; i++) {
        // Find partition with minimum size
        let minIndex = 0;
        for (let j = 1; j < numPartitions; j++) {
          if (partitionSizes[j] < partitionSizes[minIndex]) {
            minIndex = j;
          }
        }

        partitions[minIndex].push(data[i]);
        partitionSizes[minIndex]++;
      }

      return partitions;
    },

    /**
     * Create sliding window over data
     */
    slidingWindow: (data: T[], windowSize: number, step: number = 1): T[][] => {
      const windows: T[][] = [];
      
      for (let i = 0; i <= data.length - windowSize; i += step) {
        windows.push(data.slice(i, i + windowSize));
      }

      return windows;
    },

    /**
     * Efficient data deduplication using Set
     */
    deduplicate: (data: T[], keyFn?: (item: T) => unknown): T[] => {
      if (!keyFn) {
        return Array.from(new Set(data));
      }

      const seen = new Set();
      return data.filter(item => {
        const key = keyFn(item);
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      });
    },

    /**
     * Efficient intersection of multiple arrays
     */
    intersection: (...arrays: T[][]): T[] => {
      if (arrays.length === 0) return [];
      if (arrays.length === 1) return [...arrays[0]];

      // Start with the smallest array for efficiency
      const result = arrays.reduce((a, b) => a.length <= b.length ? a : b);
      const otherArrays = arrays.filter(arr => arr !== result);

      return result.filter(item =>
        otherArrays.every(arr => arr.includes(item))
      );
    },

    /**
     * Efficient union of multiple arrays
     */
    union: (...arrays: T[][]): T[] => {
      const seen = new Set<T>();
      const result: T[] = [];

      for (const array of arrays) {
        for (const item of array) {
          if (!seen.has(item)) {
            seen.add(item);
            result.push(item);
          }
        }
      }

      return result;
    },

    /**
     * Find differences between arrays
     */
    difference: (array1: T[], array2: T[]): T[] => {
      const set2 = new Set(array2);
      return array1.filter(item => !set2.has(item));
    }
  }), []);

  return transformations;
}

/**
 * Hook for data structure performance monitoring
 */
export function useDataStructureMetrics() {
  const [metrics, setMetrics] = useState({
    operationCounts: new Map<string, number>(),
    performanceTimes: new Map<string, number[]>(),
    memoryUsage: new Map<string, number>()
  });

  const measureOperation = useCallback(<Args extends unknown[], Return>(
    operationName: string,
    operation: (...args: Args) => Return
  ) => {
    return (...args: Args): Return => {
      const startTime = performance.now();
      const startMemory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0;

      const result = operation(...args);

      const endTime = performance.now();
      const endMemory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0;

      setMetrics(prev => {
        const newMetrics = { ...prev };
        
        // Update operation count
        const currentCount = newMetrics.operationCounts.get(operationName) || 0;
        newMetrics.operationCounts.set(operationName, currentCount + 1);

        // Update performance times
        const currentTimes = newMetrics.performanceTimes.get(operationName) || [];
        currentTimes.push(endTime - startTime);
        if (currentTimes.length > 100) currentTimes.shift(); // Keep last 100 measurements
        newMetrics.performanceTimes.set(operationName, currentTimes);

        // Update memory usage
        newMetrics.memoryUsage.set(operationName, endMemory - startMemory);

        return newMetrics;
      });

      return result;
    };
  }, []);

  const getAverageTime = useCallback((operationName: string): number => {
    const times = metrics.performanceTimes.get(operationName) || [];
    if (times.length === 0) return 0;
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }, [metrics]);

  const clearMetrics = useCallback(() => {
    setMetrics({
      operationCounts: new Map(),
      performanceTimes: new Map(),
      memoryUsage: new Map()
    });
  }, []);

  return {
    metrics,
    measureOperation,
    getAverageTime,
    clearMetrics
  };
}

export default {
  useOptimizedDataStructures,
  useDataTransformations,
  useDataStructureMetrics
};
