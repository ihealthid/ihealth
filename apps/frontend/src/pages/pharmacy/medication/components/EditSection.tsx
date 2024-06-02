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

export const EditSection = forwardRef<DisclosureActionOnEdit<string>>(
  (_, ref) => {
    const [id, setId] = useState<string | undefined>();
    const [opened, { open, close }] = useDisclosure();

    const [fetcher, { data }] = useLazyGetMedicationQuery();

    useImperativeHandle(ref, () => ({
      open(id) {
        fetcher(id).then(() => {
          setId(id);
          open();
        });
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
            key={id}
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
  },
);
