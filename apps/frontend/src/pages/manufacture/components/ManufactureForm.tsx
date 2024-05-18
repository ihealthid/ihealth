import { Manufacture } from "@/services/api/manufacture";
import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface ManufactureFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Manufacture;
}

export const ManufactureForm = ({
  form,
  defaultData,
}: ManufactureFormProps) => {
  return (
    <>
      <TextInput
        {...form.getInputProps("name")}
        defaultValue={defaultData?.name}
        label="Name"
        placeholder="Enter name"
      />
    </>
  );
};
