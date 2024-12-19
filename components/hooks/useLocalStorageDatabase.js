import { useEffect } from 'react';
import usePersist from './usePersist';

const useLocalStorageDatabase = (key, initialValue) => {
    const [database, setDatabase] = usePersist(key, () => {
        const item = localStorage.getItem(key);
        console.log(item);
        item
            ? JSON.stringify([...JSON.parse(item)], initialValue)
            : initialValue
            ? JSON.stringify([initialValue])
            : JSON.stringify([]);
        return item ? JSON.parse(item) : [initialValue];
    });

    const setValue = val => {
        try {
            const savedItem = JSON.parse(localStorage.getItem(key));

            // Allow value to be a function so we have same API as useState
            const valueToStore = val instanceof Function ? val(savedItem) : savedItem ? [...savedItem, val] : [val];
            // Save state
            setDatabase(valueToStore);
            // Save to local storage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [database, setValue];
};

export default useLocalStorageDatabase;
