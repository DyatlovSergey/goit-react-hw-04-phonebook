import { useState } from "react";

const useLocaleStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });
  return [state, setState];
};

export default useLocaleStorage;
