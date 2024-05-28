import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ConsumableForm } from "./ConsumableForm";
import { DisclosureActionOnEdit } from "@/types/disclosure";
import {
  useLazyGetConsumableQuery,
  useUpdateConsumableMutation,
} from "@/services/api/consumable";

export const EditSection = forwardRef<DisclosureActionOnEdit<string>>(
  (_, ref) => {
    const [id, setId] = useState<string | undefined>();
    const [opened, { open, close }] = useDisclosure();

    const [fetcher, { data }] = useLazyGetConsumableQuery();

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
        title={<Title order={4}>Edit Consumable</Title>}
        opened={opened}
        onClose={close}
      >
        <Modal.Body>
          <FormProvider
            useMutate={useUpdateConsumableMutation}
            onSuccess={close}
            initialValues={{ id }}
          >
            {(form) => (
              <Stack>
                <ConsumableForm form={form} defaultData={data?.data} />
                <Flex justify="end" mt={16}>
                  <Button type="submit">Save</Button>
                </Flex>
              </Stack>
            )}
          </FormProvider>
        </Modal.Body>
      </Modal>
    );
  },
);
