export const localStorageUtils = {
    getArray<T>(key: string): T[] {
        const item = localStorage.getItem(key);
        if (!item) return [];
        try {
            return JSON.parse(item) as T[];
        } catch (e) {
            console.error(`Failed to parse ${key} from localStorage:`, e);
            return [];
        }
    },
    setArray<T>(key: string, array: T[]) {
        localStorage.setItem(key, JSON.stringify(array));
    },

    getObject<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        if (!item) return null;
        try {
            return JSON.parse(item) as T;
        } catch (e) {
            console.error(`Failed to parse ${key} from localStorage:`, e);
            return null;
        }
    },

    setObject<T>(key: string, object: T) {
        localStorage.setItem(key, JSON.stringify(object));
    }
};