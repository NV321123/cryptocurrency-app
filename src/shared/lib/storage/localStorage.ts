const isBrowser = typeof window !== 'undefined' && window.localStorage !== null;

export const storageService = {

  get: <T>(key: string, fallback: T): T => {
    if (!isBrowser) return fallback;

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : fallback;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return fallback;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (!isBrowser) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn('LocalStorage is full. Consider clearing old data.');
      }
    }
  },

  remove: (key: string): void => {
    if (!isBrowser) return;

    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }
};