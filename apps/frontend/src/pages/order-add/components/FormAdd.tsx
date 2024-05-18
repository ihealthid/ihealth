import { FormProvider } from "@/components/form-provider";
import { SelectMedication } from "@/features/SelectMedication";
import { Medication } from "@/services/api/medication";
import { useCreatePrescriptionItemMutation } from "@/services/api/prescription-item";
import { Stack, NumberInput, Flex, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

interface FormAddProps {
  id: number;
}

export const FormAdd = ({ id }: FormAddProps) => {
  const [medication, setMedication] = useState<Medication | null>(null);
  return (
    <FormProvider
      useMutate={useCreatePrescriptionItemMutation}
      initialValues={{ id, quantity: 1 }}
    >
      {(form) => (
        <Stack>
          <SelectMedication
            onChange={(id, val) => {
              if (id) {
                form.setFieldValue("medicationId", id);
              }
              if (val) {
                setMedication(val);
              }
            }}
          />
          <NumberInput
            label="Harga Satuan"
            value={medication?.price}
            readOnly
            thousandSeparator
          />
          <NumberInput
            label="Kuantitas"
            min={1}
            defaultValue={1}
            onChange={(val) =>
              typeof val === "number" && form.setFieldValue("quantity", val)
            }
          />
          <Flex justify="end">
            <Button type="submit" leftSection={<IconPlus />}>
              Tambahkan
            </Button>
          </Flex>
        </Stack>
      )}
    </FormProvider>
  );
};
