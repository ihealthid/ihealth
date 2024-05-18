import { useEffect, useState } from "react";

type AccessTokenResult = [string | null, (token: string) => void];

export const useAccessToken = (): AccessTokenResult => {
  const [value, setValue] = useState<string | null>(null);

  const setAccessToken = (token: string) => {
    localStorage.setItem("access-token", token);
    setValue(token);
  };

  useEffect(() => {
    const at = localStorage.getItem("access-token");
    if (at) {
      setValue(at);
    }
  }, []);

  return [value, setAccessToken];
};
