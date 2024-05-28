import { useCreateSelectOptions } from "@/hooks/useCreateSelectOptions";
import { useGetRolesQuery } from "@/services/api/role";
import { MultiSelect, MultiSelectProps, Skeleton } from "@mantine/core";

interface SelectRoleProps extends Omit<MultiSelectProps, "data"> {}

const SelectRole = (props: SelectRoleProps) => {
  const { data, isSuccess } = useGetRolesQuery();
  const options = useCreateSelectOptions(data?.data, "name", "id");

  return isSuccess ? (
    <MultiSelect
      {...props}
      data={options}
      label="Role"
      placeholder="Select role"
    />
  ) : (
    <Skeleton />
  );
};

export default SelectRole;
