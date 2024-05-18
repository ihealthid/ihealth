import { FormProvider } from "@/components/form-provider";
import { DisclosureActionOnEdit } from "@/types/disclosure";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { MaritalStatusForm } from "./MaritalStatusForm";
import {
  useLazyGetMaritalStatusQuery,
  useUpdateMaritalStatusMutation,
} from "@/services/api/marital-status";

export const EditSection = forwardRef<DisclosureActionOnEdit<number>>(
  (_, ref) => {
    const [id, setId] = useState<number | undefined>();
    const [opened, { open, close }] = useDisclosure();
    const [fetcher, { data }] = useLazyGetMaritalStatusQuery();

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
        title={<Title order={4}>Update Marital Status</Title>}
      >
        <Modal.Body>
          <FormProvider
            useMutate={useUpdateMaritalStatusMutation}
            onSuccess={close}
            initialValues={{ id }}
          >
            {(form) => (
              <Stack>
                <MaritalStatusForm form={form} defaultData={data?.data} />
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
