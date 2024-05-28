import { FormProvider } from "@/components/form-provider";
import {
  useLazyGetPatientQuery,
  useUpdatePatientMutation,
} from "@/services/api/patient";
import { DisclosureActionOnEdit } from "@/types/disclosure";
import { Stack, Flex, Button, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { PatientForm } from "./PatientForm";

export const EditSection = forwardRef<DisclosureActionOnEdit<string>>(
  (_, ref) => {
    const [id, setId] = useState<string | undefined>();
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
        title={<Title order={4}>Edit Patient</Title>}
      >
        <FormProvider
          useMutate={useUpdatePatientMutation}
          initialValues={{ id }}
          onSuccess={close}
        >
          {(form) => (
            <Stack>
              <PatientForm form={form} defaultData={data?.data} />
              <Flex justify="end" mt={16}>
                <Button type="submit">Save</Button>
              </Flex>
            </Stack>
          )}
        </FormProvider>
      </Modal>
    );
  },
);
