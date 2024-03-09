import { TypeLocalStorage } from "../types/TypeLocalStorage";

const checkLocalStorage = (key: string, defaultValue: TypeLocalStorage) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) as string)
    : defaultValue;
};

export default checkLocalStorage;
