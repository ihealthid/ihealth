import { FormProvider } from "@/components/form-provider";
import { useCreateMedicationStockMutation } from "@/services/api/medication-stock";
import { DisclosureAction } from "@/types/disclosure";
import { Button, Flex, Modal, NumberInput, Stack, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { SelectDistributor } from "./SelectDistributor";

interface AddStockSectionProps {
  medicationId: string;
}

export const AddStockSection = forwardRef<
  DisclosureAction,
  AddStockSectionProps
>(({ medicationId }, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Tambah Stok</Title>}
      opened={opened}
      onClose={close}
    >
      <Modal.Body>
        <FormProvider
          useMutate={useCreateMedicationStockMutation}
          onSuccess={close}
          initialValues={{
            medicationId,
          }}
        >
          {(form) => (
            <Stack>
              <SelectDistributor {...form.getInputProps("distributorId")} />
              <NumberInput
                {...form.getInputProps("quantity")}
                label="Kuantitas"
                placeholder="Masukan kuantitas"
              />
              <NumberInput
                {...form.getInputProps("price")}
                thousandSeparator
                label="Harga Satuan"
                placeholder="Masukan harga satuan"
              />
              <DatePickerInput
                {...form.getInputProps("expiredAt")}
                label="Tanggal Kadaluarsa"
                placeholder="Masukan tanggal kadaluarsa"
              />
              <Flex justify="end">
                <Button type="submit">Simpan</Button>
              </Flex>
            </Stack>
          )}
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
});
