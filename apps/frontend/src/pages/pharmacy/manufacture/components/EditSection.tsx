import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ManufactureForm } from "./ManufactureForm";
import { DisclosureActionOnEdit } from "@/types/disclosure";
import {
  useLazyGetManufactureQuery,
  useUpdateManufactureMutation,
} from "@/services/api/manufacture";

export const EditSection = forwardRef<DisclosureActionOnEdit<string>>(
  (_, ref) => {
    const [id, setId] = useState<string | undefined>();
    const [opened, { open, close }] = useDisclosure();

    const [fetcher, { data }] = useLazyGetManufactureQuery();

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
        title={<Title order={4}>Edit Manufacture</Title>}
        opened={opened}
        onClose={close}
      >
        <Modal.Body>
          <FormProvider
            useMutate={useUpdateManufactureMutation}
            onSuccess={close}
            initialValues={{ id }}
          >
            {(form) => (
              <Stack>
                <ManufactureForm form={form} defaultData={data?.data} />
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
