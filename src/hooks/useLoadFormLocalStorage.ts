import { useEffect } from "react";

export const useLoadFormLocalStorage = (key: string, setter: (vale: string) => void) => {
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      setter(saved);
    }
  }, [key, setter]);
};