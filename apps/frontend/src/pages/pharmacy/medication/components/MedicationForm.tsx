import { Medication } from "@/services/api/medication";
import { NumberInput, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { SelectDoseForm } from "./SelectDoseForm";

interface MedicationFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Medication;
}

export const MedicationForm = ({ form, defaultData }: MedicationFormProps) => {
  return (
    <>
      <SelectDoseForm
        defaultValue={defaultData?.doseFormId}
        onChange={(val) => form.setFieldValue("doseFormId", val)}
      />
      <TextInput
        {...form.getInputProps("name")}
        defaultValue={defaultData?.name}
        label="Name"
        placeholder="Enter name"
      />
      <TextInput
        {...form.getInputProps("bpom")}
        defaultValue={defaultData?.bpom}
        label="BPOM"
        placeholder="Enter BPOM"
      />
      <NumberInput
        {...form.getInputProps("price")}
        defaultValue={defaultData?.price}
        label="Price"
        placeholder="Enter price"
        thousandSeparator
      />
    </>
  );
};
