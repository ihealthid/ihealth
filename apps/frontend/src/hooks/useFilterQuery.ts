type Filter = {
  [key: string]: any;
};

export const useFilterQuery = (...args: Filter[]) => {
  const query = new URLSearchParams();
  for (const arg of args) {
    for (const [key, value] of Object.entries(arg)) {
      query.append(key, value);
    }
  }
  return query.toString();
};
