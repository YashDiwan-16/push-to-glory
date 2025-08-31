/**
 * Advanced sorting algorithms optimized for different data types and scenarios
 */

/**
 * Heap sort implementation
 */
export function heapSort<T>(
  array: T[],
  compareFn?: (a: T, b: T) => number
): T[] {
  const arr = [...array];
  const compare = compareFn || ((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  // Build max heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i, compare);
  }

  // Extract elements from heap one by one
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0, compare);
  }

  return arr;
}

function heapify<T>(
  array: T[],
  heapSize: number,
  rootIndex: number,
  compareFn: (a: T, b: T) => number
): void {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;

  if (left < heapSize && compareFn(array[left], array[largest]) > 0) {
    largest = left;
  }

  if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
    largest = right;
  }

  if (largest !== rootIndex) {
    [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];
    heapify(array, heapSize, largest, compareFn);
  }
}

/**
 * Radix sort for integers
 */
export function radixSort(array: number[]): number[] {
  if (array.length <= 1) return array;

  const arr = [...array];
  const max = Math.max(...arr);
  const maxDigits = Math.floor(Math.log10(max)) + 1;

  for (let digit = 0; digit < maxDigits; digit++) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);

    for (const num of arr) {
      const digitValue = Math.floor(num / Math.pow(10, digit)) % 10;
      buckets[digitValue].push(num);
    }

    arr.splice(0, arr.length, ...buckets.flat());
  }

  return arr;
}

/**
 * Counting sort for small range integers
 */
export function countingSort(array: number[], maxValue?: number): number[] {
  if (array.length <= 1) return array;

  const max = maxValue || Math.max(...array);
  const min = Math.min(...array);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(array.length);

  // Count occurrences
  for (const num of array) {
    count[num - min]++;
  }

  // Calculate cumulative count
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  // Build output array
  for (let i = array.length - 1; i >= 0; i--) {
    output[count[array[i] - min] - 1] = array[i];
    count[array[i] - min]--;
  }

  return output;
}

/**
 * Bucket sort for uniformly distributed data
 */
export function bucketSort(array: number[], bucketCount = 10): number[] {
  if (array.length <= 1) return array;

  const min = Math.min(...array);
  const max = Math.max(...array);
  const bucketSize = (max - min) / bucketCount;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  // Distribute elements into buckets
  for (const num of array) {
    const bucketIndex = Math.min(
      Math.floor((num - min) / bucketSize),
      bucketCount - 1
    );
    buckets[bucketIndex].push(num);
  }

  // Sort each bucket and concatenate
  const result: number[] = [];
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
    result.push(...bucket);
  }

  return result;
}

/**
 * Tim sort (hybrid stable sorting algorithm)
 */
export function timSort<T>(
  array: T[],
  compareFn?: (a: T, b: T) => number
): T[] {
  const arr = [...array];
  const compare = compareFn || ((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  const MIN_MERGE = 32;

  function insertionSort(arr: T[], left: number, right: number): void {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;

      while (j >= left && compare(arr[j], key) > 0) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }

  function merge(arr: T[], left: number, mid: number, right: number): void {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (compare(leftArr[i], rightArr[j]) <= 0) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }
  }

  const n = arr.length;

  // Sort individual subarrays of size MIN_MERGE using insertion sort
  for (let i = 0; i < n; i += MIN_MERGE) {
    insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
  }

  // Start merging from size MIN_MERGE
  for (let size = MIN_MERGE; size < n; size *= 2) {
    for (let start = 0; start < n; start += size * 2) {
      const mid = start + size - 1;
      const end = Math.min(start + size * 2 - 1, n - 1);

      if (mid < end) {
        merge(arr, start, mid, end);
      }
    }
  }

  return arr;
}

export default {
  heapSort,
  radixSort,
  countingSort,
  bucketSort,
  timSort
};
