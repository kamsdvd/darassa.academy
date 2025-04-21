interface CacheItem<T> {
  data: T;
  timestamp: number;
  lastValidated: number;
  stale: boolean;
}

interface CacheConfig {
  defaultTTL: number;
  staleWhileRevalidateTime: number;
  persistenceKey: string;
}

class CacheService {
  private cache: Map<string, CacheItem<any>>;
  private config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      defaultTTL: 5 * 60 * 1000, // 5 minutes
      staleWhileRevalidateTime: 30 * 60 * 1000, // 30 minutes
      persistenceKey: 'app_cache',
      ...config
    };
    this.cache = new Map();
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.config.persistenceKey);
      if (stored) {
        const data = JSON.parse(stored);
        Object.entries(data).forEach(([key, value]) => {
          this.cache.set(key, value as CacheItem<any>);
        });
      }
    } catch (error) {
      console.warn('Failed to load cache from storage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      const data = Object.fromEntries(this.cache.entries());
      localStorage.setItem(this.config.persistenceKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save cache to storage:', error);
    }
  }

  async set<T>(key: string, data: T, ttl = this.config.defaultTTL): Promise<void> {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now() + ttl,
      lastValidated: Date.now(),
      stale: false
    };
    this.cache.set(key, item);
    this.saveToStorage();
  }

  async get<T>(key: string, revalidate?: () => Promise<T>): Promise<T | null> {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    const now = Date.now();
    const isExpired = now > item.timestamp;
    const isStale = isExpired && now < (item.timestamp + this.config.staleWhileRevalidateTime);

    // Si les données sont périmées mais dans la période stale
    if (isStale && revalidate) {
      item.stale = true;
      this.cache.set(key, item);
      
      // Revalider en arrière-plan
      revalidate().then((newData) => {
        this.set(key, newData);
      }).catch(console.error);
      
      return item.data as T;
    }

    // Si les données sont complètement expirées
    if (isExpired) {
      this.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    const now = Date.now();
    return now <= (item.timestamp + this.config.staleWhileRevalidateTime);
  }

  delete(key: string): void {
    this.cache.delete(key);
    this.saveToStorage();
  }

  clear(): void {
    this.cache.clear();
    localStorage.removeItem(this.config.persistenceKey);
  }

  preload<T>(key: string, dataPromise: Promise<T>): Promise<void> {
    return dataPromise.then(data => this.set(key, data));
  }
}

export const cacheService = new CacheService();

// Axios avec cache amélioré
import axios, { AxiosRequestConfig } from 'axios';

export const cachedAxios = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const cacheKey = `${url}${config ? JSON.stringify(config) : ''}`;
    
    const revalidate = async () => {
      const response = await axios.get<T>(url, config);
      return response.data;
    };

    const cachedData = await cacheService.get<T>(cacheKey, revalidate);
    if (cachedData) {
      return cachedData;
    }

    const response = await revalidate();
    await cacheService.set(cacheKey, response);
    return response;
  }
}; 