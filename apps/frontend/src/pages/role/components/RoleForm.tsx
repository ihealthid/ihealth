import { TextInput } from "@mantine/core";
import { SelectRoleType } from "./SelectRoleType";
import { UseFormReturnType } from "@mantine/form";

interface RoleFormProps<T> {
  form: UseFormReturnType<T>;
  defaultData?: Record<string, any>;
}

export const RoleForm = <T,>({ form, defaultData }: RoleFormProps<T>) => {
  return (
    <>
      <SelectRoleType
        {...form.getInputProps("type")}
        defaultValue={defaultData?.type}
      />
      <TextInput
        {...form.getInputProps("name")}
        label="Name"
        placeholder="Enter name"
        defaultValue={defaultData?.name}
      />
    </>
  );
};
