import { useState } from "react";
import Cookies from "js-cookie";

type StorageKey = "savedArticles";

const useLocalStorage = <T>(key: StorageKey, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const cookieValue = Cookies.get(key);
      return cookieValue ? JSON.parse(cookieValue) : initialValue;
    } catch (error) {
      console.error(`Error getting ${key} from cookie`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      Cookies.set(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} to cookie`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
