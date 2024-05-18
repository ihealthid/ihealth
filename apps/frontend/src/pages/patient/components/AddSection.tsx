import { FormProvider } from "@/components/form-provider";
import { usePostPatientMutation } from "@/services/api/patient";
import { DisclosureAction } from "@/types/disclosure";
import { Stack, Flex, Button, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle } from "react";
import { PatientForm } from "./PatientForm";

export const AddSection = forwardRef<DisclosureAction>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({ open, close }));
  return (
    <Modal
    size="lg"
      opened={opened}
      onClose={close}
      title={<Title order={4}>Tambah Pasien</Title>}
    >
      <FormProvider
        useMutate={usePostPatientMutation}
        onSuccess={close}
      >
        {(form) => (
          <Stack>
            <PatientForm form={form} />
            <Flex justify="end" mt={16}>
              <Button type="submit">Simpan</Button>
            </Flex>
          </Stack>
        )}
      </FormProvider>
    </Modal>
  );
});
