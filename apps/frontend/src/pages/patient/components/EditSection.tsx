import { FormProvider } from "@/components/form-provider";
import {
  useLazyGetPatientQuery,
  usePutPatientMutation,
} from "@/services/api/patient";
import { DisclosureActionOnEdit } from "@/types/disclosure";
import { Stack, Flex, Button, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { PatientForm } from "./PatientForm";

export const EditSection = forwardRef<DisclosureActionOnEdit<number>>(
  (_, ref) => {
    const [id, setId] = useState<number | undefined>();
    const [opened, { open, close }] = useDisclosure();
    const [fetcher, { data }] = useLazyGetPatientQuery();

    useImperativeHandle(ref, () => ({
      open(id) {
        open();
        fetcher(id);
        setId(id);
      },
      close,
    }));

    return (
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={4}>Edit Pasien</Title>}
      >
        <FormProvider
          useMutate={usePutPatientMutation}
          initialValues={{ id }}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <PatientForm form={form} defaultData={data?.data} />
              <Flex justify="end" mt={16}>
                <Button type="submit">Simpan</Button>
              </Flex>
            </Stack>
          )}
        </FormProvider>
      </Modal>
    );
  }
);
