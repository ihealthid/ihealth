import { Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { SelectDistributor } from "./SelectDistributor";
import { Procurement } from "@/services/api/procurement";
import { ItemSelector } from "./ItemSelector";

interface ProcurementFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Procurement;
}

export const ProcurementForm = ({
  form,
  defaultData,
}: ProcurementFormProps) => {
  return (
    <>
      <SelectDistributor
        {...form.getInputProps("distributorId")}
        defaultValue={defaultData?.distributorId}
      />
      <Stack>
        <ItemSelector onChange={(val) => form.setFieldValue("items", val)} />
      </Stack>
    </>
  );
};
