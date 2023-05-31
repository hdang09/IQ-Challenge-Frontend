class LocalStorageUtils {
    getItem(key: string, defaultValue: string = ''): string | null {
        if (typeof localStorage === 'undefined') {
            return null;
        }
        let item = localStorage.getItem(key);
        if (item === null) {
            item = defaultValue;
        }
        return item;
    }

    setItem(key: string, value: string = ''): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, value);
        }
    }

    removeItem(key: string): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(key);
        }
    }

    clear(): void {
        localStorage.clear();
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LocalStorageUtils();
