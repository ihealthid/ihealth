import { useGetClassificationDiseaseGroupQuery } from "@/services/api/classification-disease";
import { Select, SelectProps } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useMemo } from "react";

interface SelectClassificationDiseaseProps extends Omit<SelectProps, "data"> {}

export const SelectClassificationDisease = (
  props: SelectClassificationDiseaseProps,
) => {
  const [search, setSearch] = useDebouncedState("", 300);
  const { data } = useGetClassificationDiseaseGroupQuery({
    page: 1,
    limit: 25,
    search,
    grouping: true,
  });

  const options = useMemo(() => {
    if (!data) return [];

    return data.data.map((row) => ({
      group: `${row.display} - ${row.definition}`,
      items: row.children.map((item) => ({
        label: `${item.display} - ${item.definition}`,
        value: item.id.toString(),
      })),
    }));
  }, [data]);

  return (
    <Select
      {...props}
      data={options}
      limit={10}
      searchable
      clearable
      searchValue={search}
      onSearchChange={setSearch}
    />
  );
};
