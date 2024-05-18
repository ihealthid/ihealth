import { FormProvider } from "@/components/form-provider";
import { usePostMedicationMutation } from "@/services/api/medication";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { MedicationForm } from "./MedicationForm";
import { DisclosureAction } from "@/types/disclosure";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title={<Title order={4}>Tambah Obat</Title>}
      opened={opened}
      onClose={close}
    >
      <Modal.Body>
        <FormProvider useMutate={usePostMedicationMutation} onSuccess={close}>
          {(form) => (
            <Stack>
              <MedicationForm form={form} />
              <Flex justify="end" mt={16}>
                <Button type="submit">Simpan</Button>
              </Flex>
            </Stack>
          )}
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
});
