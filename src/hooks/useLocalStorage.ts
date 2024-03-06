import { useEffect } from "react";
import INewsData from "../types/INewsData";
import ICryptoData from "../types/ICryptoData";

const useLocalStorage = (
  name: string,
  data: INewsData | ICryptoData | undefined
) => {
  useEffect(() => {
    if (data) {
      localStorage.setItem(name, JSON.stringify(data));
    }
  }, [name, data]);
};

export default useLocalStorage;
