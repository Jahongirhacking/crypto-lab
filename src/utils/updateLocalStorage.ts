import { TypeLocalStorage } from "../types/TypeLocalStorage";

const updateLocalStorage = (key: string, value: TypeLocalStorage) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default updateLocalStorage;
