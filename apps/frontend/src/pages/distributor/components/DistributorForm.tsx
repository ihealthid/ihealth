import { Distributor } from "@/services/api/distributor";
import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface DistributorFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Distributor;
}

export const DistributorForm = ({
  form,
  defaultData,
}: DistributorFormProps) => {
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
