import { useGetRolesQuery } from "@/services/api/role";
import { MultiSelect, MultiSelectProps, Skeleton } from "@mantine/core";
import { useMemo } from "react";

interface SelectRoleProps
  extends Omit<MultiSelectProps, "data" | "onChange" | "type"> {
  onChange(value: number[]): void;
  type?: "medic" | "non-medic";
}

const SelectRole = ({ onChange, ...props }: SelectRoleProps) => {
  const { data, isSuccess } = useGetRolesQuery();
  const options = useMemo(
    () =>
      (data?.data ?? []).map((item) => ({
        label: item.name,
        value: item.id.toString(),
      })),
    [data]
  );

  return isSuccess ? (
    <MultiSelect
      {...props}
      data={options}
      label="Hak Akses"
      placeholder="Pilih Hak Akses"
      onChange={(values) => {
        onChange(values.map((value) => parseInt(value, 10)));
      }}
    />
  ) : (
    <Skeleton />
  );
};

export default SelectRole;
