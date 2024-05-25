import { useMap } from "@mantine/hooks";

export interface PaginateQuery {
  set: (key: string, value: string) => Map<string, string>;
  delete: (key: string) => void;
  get: () => {
    [key: string]: string;
  };
}

export const usePaginateQuery = (): PaginateQuery => {
  const mapper = useMap<string, string>([]);

  return {
    set: mapper.set,
    delete: mapper.delete,
    get: () => {
      const o: { [key: string]: string } = {};
      for (const [key, value] of Array.from(mapper.entries())) {
        o[key] = value;
      }
      return o;
    },
  };
};
