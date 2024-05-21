import { useGetUsersQuery } from "@/services/api/user";
import { Select, SelectProps } from "@mantine/core";
import { useMemo } from "react";

interface SelectUserProps extends Omit<SelectProps, "data"> {}

export const SelectUser = (props: SelectUserProps) => {
  const { data } = useGetUsersQuery({});

  const options = useMemo(() => {
    if (!data) return [];
    return data.data.map((row) => ({
      label: row.fullName,
      value: row.id,
    }));
  }, [data]);

  return <Select {...props} label="User" data={options} />;
};
