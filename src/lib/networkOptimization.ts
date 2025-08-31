/**
 * Network optimization utilities for efficient data transfer
 */

interface NetworkConfig {
  timeout?: number;
  retries?: number;
  batchSize?: number;
  cacheExpiry?: number;
}

/**
 * Smart request batching and caching
 */
export class NetworkOptimizer {
  private requestQueue: Array<{
    url: string;
    options?: RequestInit;
    resolve: (response: Response) => void;
    reject: (error: Error) => void;
  }> = [];
  
  private batchTimeout: NodeJS.Timeout | null = null;
  private cache = new Map<string, { data: Response; expiry: number }>();
  private config: Required<NetworkConfig>;

  constructor(config: NetworkConfig = {}) {
    this.config = {
      timeout: config.timeout || 5000,
      retries: config.retries || 3,
      batchSize: config.batchSize || 10,
      cacheExpiry: config.cacheExpiry || 5 * 60 * 1000 // 5 minutes
    };
  }

  async fetch(url: string, options?: RequestInit): Promise<Response> {
    const cacheKey = this.getCacheKey(url, options);
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data.clone();
    }

    return new Promise((resolve, reject) => {
      this.requestQueue.push({ url, options, resolve, reject });
      
      if (this.requestQueue.length >= this.config.batchSize) {
        this.processBatch();
      } else if (!this.batchTimeout) {
        this.batchTimeout = setTimeout(() => this.processBatch(), 10);
      }
    });
  }

  private async processBatch(): Promise<void> {
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }

    const batch = this.requestQueue.splice(0, this.config.batchSize);
    
    const promises = batch.map(async ({ url, options, resolve, reject }) => {
      try {
        const response = await this.executeRequest(url, options);
        const cacheKey = this.getCacheKey(url, options);
        
        // Cache successful responses
        if (response.ok) {
          this.cache.set(cacheKey, {
            data: response.clone(),
            expiry: Date.now() + this.config.cacheExpiry
          });
        }
        
        resolve(response);
      } catch (error) {
        reject(error as Error);
      }
    });

    await Promise.allSettled(promises);
  }

  private async executeRequest(url: string, options?: RequestInit): Promise<Response> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < this.config.retries) {
          // Exponential backoff
          await this.delay(Math.pow(2, attempt) * 1000);
        }
      }
    }
    
    throw lastError!;
  }

  private getCacheKey(url: string, options?: RequestInit): string {
    return JSON.stringify({ url, method: options?.method || 'GET', body: options?.body });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

/**
 * Request deduplication
 */
export class RequestDeduplicator {
  private pendingRequests = new Map<string, Promise<Response>>();

  async fetch(url: string, options?: RequestInit): Promise<Response> {
    const key = this.getRequestKey(url, options);
    
    if (this.pendingRequests.has(key)) {
      const response = await this.pendingRequests.get(key)!;
      return response.clone();
    }

    const request = fetch(url, options);
    this.pendingRequests.set(key, request);

    try {
      const response = await request;
      return response;
    } finally {
      this.pendingRequests.delete(key);
    }
  }

  private getRequestKey(url: string, options?: RequestInit): string {
    return JSON.stringify({ 
      url, 
      method: options?.method || 'GET',
      headers: options?.headers,
      body: options?.body 
    });
  }

  getPendingCount(): number {
    return this.pendingRequests.size;
  }
}

/**
 * Connection pooling simulation
 */
export class ConnectionPool {
  private activeConnections = 0;
  private queue: Array<() => void> = [];
  private maxConnections: number;

  constructor(maxConnections = 6) {
    this.maxConnections = maxConnections;
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    await this.acquire();
    
    try {
      return await operation();
    } finally {
      this.release();
    }
  }

  private acquire(): Promise<void> {
    return new Promise(resolve => {
      if (this.activeConnections < this.maxConnections) {
        this.activeConnections++;
        resolve();
      } else {
        this.queue.push(() => {
          this.activeConnections++;
          resolve();
        });
      }
    });
  }

  private release(): void {
    this.activeConnections--;
    
    if (this.queue.length > 0) {
      const next = this.queue.shift()!;
      next();
    }
  }

  getActiveConnections(): number {
    return this.activeConnections;
  }

  getQueueLength(): number {
    return this.queue.length;
  }
}

/**
 * Bandwidth monitoring
 */
export class BandwidthMonitor {
  private measurements: Array<{ time: number; bytes: number }> = [];
  private windowSize = 10; // Keep last 10 measurements

  recordTransfer(bytes: number): void {
    this.measurements.push({ time: Date.now(), bytes });
    
    if (this.measurements.length > this.windowSize) {
      this.measurements.shift();
    }
  }

  getAverageBandwidth(): number {
    if (this.measurements.length < 2) return 0;

    const totalBytes = this.measurements.reduce((sum, m) => sum + m.bytes, 0);
    const timeSpan = this.measurements[this.measurements.length - 1].time - this.measurements[0].time;
    
    return timeSpan > 0 ? (totalBytes * 1000) / timeSpan : 0; // bytes per second
  }

  getCurrentBandwidth(): number {
    if (this.measurements.length < 2) return 0;

    const recent = this.measurements.slice(-2);
    const bytes = recent[1].bytes;
    const timeDiff = recent[1].time - recent[0].time;
    
    return timeDiff > 0 ? (bytes * 1000) / timeDiff : 0;
  }
}

export default {
  NetworkOptimizer,
  RequestDeduplicator,
  ConnectionPool,
  BandwidthMonitor
};
