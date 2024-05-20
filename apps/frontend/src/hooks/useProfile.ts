import { useLocalStorage } from "@mantine/hooks";

export const useProfile = () => {
  const [profile, setter] = useLocalStorage<string | null>({
    key: "profile",
    defaultValue: null,
  });

  const setProfile = (value: Record<string, any>) => {
    setter(() => JSON.stringify(value));
  };

  return [profile, setProfile];
};
