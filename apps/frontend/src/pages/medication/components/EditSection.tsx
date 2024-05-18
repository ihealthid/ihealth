import { FormProvider } from "@/components/form-provider";
import {
  useLazyGetMedicationQuery,
  usePutMedicationMutation,
} from "@/services/api/medication";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { MedicationForm } from "./MedicationForm";
import { DisclosureActionOnEdit } from "@/types/disclosure";

export const EditSection = forwardRef<DisclosureActionOnEdit<number>>(
  (_, ref) => {
    const [id, setId] = useState<number | undefined>();
    const [opened, { open, close }] = useDisclosure();

    const [fetcher, { data }] = useLazyGetMedicationQuery();

    useImperativeHandle(ref, () => ({
      open(id) {
        open();
        setId(id);
        fetcher(id);
      },
      close,
    }));

    return (
      <Modal
        title={<Title order={4}>Edit Obat</Title>}
        opened={opened}
        onClose={close}
      >
        <Modal.Body>
          <FormProvider
            useMutate={usePutMedicationMutation}
            onSuccess={close}
            initialValues={{ id }}
          >
            {(form) => (
              <Stack>
                <MedicationForm form={form} defaultData={data?.data} />
                <Flex justify="end" mt={16}>
                  <Button type="submit">Simpan</Button>
                </Flex>
              </Stack>
            )}
          </FormProvider>
        </Modal.Body>
      </Modal>
    );
  }
);
