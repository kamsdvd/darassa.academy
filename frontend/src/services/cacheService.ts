interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class CacheService {
  private cache: Map<string, CacheItem<any>>;
  private readonly defaultTTL: number;

  constructor(defaultTTL = 5 * 60 * 1000) { // 5 minutes par défaut
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  set<T>(key: string, data: T, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    return this.cache.has(key) && Date.now() <= (this.cache.get(key)?.timestamp ?? 0);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cacheService = new CacheService();

// Exemple d'utilisation avec axios
import axios, { AxiosRequestConfig } from 'axios';

export const cachedAxios = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const cacheKey = `${url}${config ? JSON.stringify(config) : ''}`;
    
    const cachedData = cacheService.get<T>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await axios.get<T>(url, config);
    cacheService.set(cacheKey, response.data);
    return response.data;
  }
}; 