import { FormProvider } from "@/components/form-provider";
import { DisclosureActionOnEdit } from "@/types/disclosure";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ParticipantTypeCodeForm } from "./ParticipantTypeCodeForm";
import {
  useLazyGetCodeSystemQuery,
  useUpdateCodeSystemMutation,
} from "@/services/api/code-system";

export const EditSection = forwardRef<DisclosureActionOnEdit<number>>(
  (_, ref) => {
    const [id, setId] = useState<number | undefined>();
    const [opened, { open, close }] = useDisclosure();
    const [fetcher, { data }] = useLazyGetCodeSystemQuery();

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
        title={<Title order={4}>Edit Code System</Title>}
      >
        <Modal.Body>
          <FormProvider
            useMutate={useUpdateCodeSystemMutation}
            onSuccess={close}
            initialValues={{ id }}
          >
            {(form) => (
              <Stack>
                <ParticipantTypeCodeForm form={form} defaultData={data?.data} />
                <Flex justify="end">
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
