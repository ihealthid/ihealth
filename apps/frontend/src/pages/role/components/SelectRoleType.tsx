import { useGetRoleTypesQuery } from "@/services/api/role-type";
import { Select, SelectProps, Skeleton } from "@mantine/core";

export const SelectRoleType = (props: SelectProps) => {
  const { data, isLoading } = useGetRoleTypesQuery();
  return isLoading ? (
    <Skeleton />
  ) : (
    <Select
      {...props}
      disabled={isLoading}
      label="Type of Role"
      placeholder="Select type of role"
      data={data?.data ?? []}
    />
  );
};
