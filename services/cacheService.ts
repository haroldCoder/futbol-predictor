import AsyncStorage from "@react-native-async-storage/async-storage";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class CacheService {
  private static readonly PREFIX = "futbol_cache_";

  /**
   * Guardar datos en caché con TTL
   */
  static async set<T>(key: string, data: T, ttlMinutes: number = 30): Promise<void> {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl: ttlMinutes * 60 * 1000,
      };
      await AsyncStorage.setItem(`${this.PREFIX}${key}`, JSON.stringify(entry));
    } catch (error) {
      console.error(`Error caching key ${key}:`, error);
    }
  }

  /**
   * Obtener datos del caché si no han expirado
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(`${this.PREFIX}${key}`);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);
      const now = Date.now();
      const age = now - entry.timestamp;

      // Si el caché ha expirado, eliminarlo y retornar null
      if (age > entry.ttl) {
        await AsyncStorage.removeItem(`${this.PREFIX}${key}`);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error(`Error retrieving cache key ${key}:`, error);
      return null;
    }
  }

  /**
   * Limpiar caché específico
   */
  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`${this.PREFIX}${key}`);
    } catch (error) {
      console.error(`Error removing cache key ${key}:`, error);
    }
  }

  /**
   * Limpiar todo el caché
   */
  static async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((k) => k.startsWith(this.PREFIX));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  }

  /**
   * Obtener datos del caché o llamar a función para obtener datos frescos
   */
  static async getOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttlMinutes: number = 30,
  ): Promise<T> {
    // Intentar obtener del caché primero
    const cached = await this.get<T>(key);
    if (cached) {
      return cached;
    }

    // Si no está en caché, obtener datos frescos
    const data = await fetchFn();

    // Guardar en caché
    await this.set(key, data, ttlMinutes);

    return data;
  }
}

export default CacheService;
