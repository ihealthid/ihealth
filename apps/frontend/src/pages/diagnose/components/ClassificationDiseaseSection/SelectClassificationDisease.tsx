import { usePaginateQuery } from "@/hooks/usePaginateQuery";
import { useGetClassificationDiseaseGroupQuery } from "@/services/api/classification-disease";
import { Select, SelectProps } from "@mantine/core";
import { useMemo } from "react";
import _ from "lodash";

interface SelectClassificationDiseaseProps extends Omit<SelectProps, "data"> {}

export const SelectClassificationDisease = (
  props: SelectClassificationDiseaseProps,
) => {
  const paginateQuery = usePaginateQuery();
  const { data } = useGetClassificationDiseaseGroupQuery({
    page: 1,
    limit: 25,
    "filter.children.parentId": "$not:null",
    ...paginateQuery.get(),
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
      onSearchChange={(val) => {
        if (_.isEmpty(val)) {
          paginateQuery.clear();
        } else {
          paginateQuery.set("filter.children.display", "$ilike:" + val);
        }
      }}
    />
  );
};
