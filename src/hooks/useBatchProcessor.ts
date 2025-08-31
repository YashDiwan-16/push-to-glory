import { useState, useEffect, useCallback } from 'react';

interface BatchProcessorOptions<T> {
  batchSize: number;
  delay: number;
  onProgress?: (processed: number, total: number) => void;
  onComplete?: (results: T[]) => void;
  onError?: (error: Error) => void;
}

/**
 * Optimized batch processing hook for large datasets
 * Prevents UI blocking during heavy operations
 */
export function useBatchProcessor<T, R>(
  items: T[],
  processor: (item: T) => R | Promise<R>,
  options: BatchProcessorOptions<R>
) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processed, setProcessed] = useState(0);
  const [results, setResults] = useState<R[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const {
    batchSize = 10,
    delay = 10,
    onProgress,
    onComplete,
    onError
  } = options;

  const processBatch = useCallback(async (
    startIndex: number,
    itemsToProcess: T[],
    currentResults: R[]
  ): Promise<R[]> => {
    const batch = itemsToProcess.slice(startIndex, startIndex + batchSize);
    const batchResults: R[] = [];

    for (const item of batch) {
      try {
        const result = await processor(item);
        batchResults.push(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onError?.(error);
        throw error;
      }
    }

    const newResults = [...currentResults, ...batchResults];
    const newProcessed = startIndex + batch.length;
    
    setResults(newResults);
    setProcessed(newProcessed);
    onProgress?.(newProcessed, itemsToProcess.length);

    return newResults;
  }, [processor, batchSize, onProgress, onError]);

  const startProcessing = useCallback(async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setProcessed(0);
    setResults([]);
    setError(null);

    try {
      let currentResults: R[] = [];
      
      for (let i = 0; i < items.length; i += batchSize) {
        currentResults = await processBatch(i, items, currentResults);
        
        // Add delay to prevent UI blocking
        if (i + batchSize < items.length && delay > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      onComplete?.(currentResults);
    } catch {
      // Error already handled in processBatch
    } finally {
      setIsProcessing(false);
    }
  }, [items, batchSize, delay, processBatch, onComplete, isProcessing]);

  const stopProcessing = useCallback(() => {
    setIsProcessing(false);
  }, []);

  const reset = useCallback(() => {
    setIsProcessing(false);
    setProcessed(0);
    setResults([]);
    setError(null);
  }, []);

  return {
    isProcessing,
    processed,
    total: items.length,
    progress: items.length > 0 ? (processed / items.length) * 100 : 0,
    results,
    error,
    startProcessing,
    stopProcessing,
    reset
  };
}

/**
 * Optimized image loading hook with batch processing
 * Efficiently loads multiple images without blocking UI
 */
export function useBatchImageLoader(urls: string[], batchSize = 5) {
  const [loadedImages, setLoadedImages] = useState<Map<string, HTMLImageElement>>(new Map());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const loadImage = useCallback((url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  }, []);

  const { isProcessing, progress, startProcessing } = useBatchProcessor(
    urls,
    loadImage,
    {
      batchSize,
      delay: 50,
      onProgress: (processed, total) => {
        console.log(`Loaded ${processed}/${total} images`);
      },
      onComplete: (results) => {
        const imageMap = new Map<string, HTMLImageElement>();
        results.forEach((img, index) => {
          imageMap.set(urls[index], img);
        });
        setLoadedImages(imageMap);
      },
      onError: (error) => {
        console.error('Image loading error:', error);
        // Extract URL from error message if possible
        const failedUrl = error.message.match(/Failed to load image: (.+)/)?.[1];
        if (failedUrl) {
          setFailedImages(prev => new Set(prev).add(failedUrl));
        }
      }
    }
  );

  useEffect(() => {
    if (urls.length > 0) {
      startProcessing();
    }
  }, [urls, startProcessing]);

  return {
    isLoading: isProcessing,
    progress,
    loadedImages,
    failedImages,
    getImage: (url: string) => loadedImages.get(url),
    isImageLoaded: (url: string) => loadedImages.has(url),
    isImageFailed: (url: string) => failedImages.has(url)
  };
}

/**
 * Optimized data transformation hook with batch processing
 * Transforms large datasets without blocking UI
 */
export function useBatchDataTransform<T, R>(
  data: T[],
  transformer: (item: T) => R,
  batchSize = 100
) {
  const [transformedData, setTransformedData] = useState<R[]>([]);

  const { isProcessing, progress, startProcessing } = useBatchProcessor(
    data,
    transformer,
    {
      batchSize,
      delay: 10,
      onComplete: (results) => {
        setTransformedData(results);
      }
    }
  );

  useEffect(() => {
    if (data.length > 0) {
      startProcessing();
    }
  }, [data, startProcessing]);

  return {
    isTransforming: isProcessing,
    progress,
    transformedData,
    hasData: transformedData.length > 0
  };
}

export default useBatchProcessor;
