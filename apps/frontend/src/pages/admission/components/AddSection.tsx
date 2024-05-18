import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, ModalBody, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SelectPatientConditionCode } from "./SelectPatientConditionCode";
import { SelectPatient } from "./SelectPatient";
import { SelectService } from "./SelectService";
import { forwardRef, useImperativeHandle } from "react";
import { usePostEncounterMutation } from "@/services/api/encounter";

export interface AddSectionRef {
  open: () => void;
  close: () => void;
}

export const AddSection = forwardRef<AddSectionRef>((_, ref) => {
  const [opened, { open, close }] = useDisclosure();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Title order={4}>Daftar Kunjungan Baru</Title>}
    >
      <ModalBody>
        <FormProvider useMutate={usePostEncounterMutation} onSuccess={close}>
          {(form) => (
            <Stack>
              <SelectPatientConditionCode
                onChange={(e) =>
                  e && form.setFieldValue("patientConditionId", parseInt(e))
                }
              />
              <SelectPatient
                onChange={(e) => e && form.setFieldValue("patientId", e)}
              />
              <SelectService
                onChange={(e) => e && form.setFieldValue("healthcareServiceId", e)}
              />
              <Flex justify="end" mt="md">
                <Button type="submit">Simpan</Button>
              </Flex>
            </Stack>
          )}
        </FormProvider>
      </ModalBody>
    </Modal>
  );
});
