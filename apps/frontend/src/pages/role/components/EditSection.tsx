import { FormProvider } from "@/components/form-provider";
import { useLazyGetRoleQuery, usePutRoleMutation } from "@/services/api/role";
import { Button, Flex, Modal, ModalBody, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { RoleForm } from "./RoleForm";
import { DisclosureActionOnEdit } from "@/types/disclosure";

export const EditSection = forwardRef<DisclosureActionOnEdit<number>>(
  (_, ref) => {
    const [id, setId] = useState<number | undefined>(undefined);
    const [opened, { open, close }] = useDisclosure();
    const [fetcher, { data }] = useLazyGetRoleQuery();

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
        opened={opened}
        onClose={close}
        title={<Title order={4}>Edit Role</Title>}
      >
        <ModalBody>
          <FormProvider
            useMutate={usePutRoleMutation}
            initialValues={{ id }}
            onSuccess={close}
          >
            {(form) => (
              <Stack>
                <RoleForm form={form} defaultData={data?.data} />
                <Flex justify="end">
                  <Button type="submit">Save</Button>
                </Flex>
              </Stack>
            )}
          </FormProvider>
        </ModalBody>
      </Modal>
    );
  }
);
