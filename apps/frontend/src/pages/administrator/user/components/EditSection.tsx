import { FormProvider } from "@/components/form-provider";
import {
  useLazyGetUserQuery,
  useUpdateUserMutation,
} from "@/services/api/user";
import { Button, Flex, Modal, Stack, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SelectRole from "./SelectRole";
import { forwardRef, useImperativeHandle, useState } from "react";
import { DisclosureActionOnEdit } from "@/types/disclosure";

export const EditSection = forwardRef<DisclosureActionOnEdit<string>>(
  (_, ref) => {
    const [opened, { open, close }] = useDisclosure();
    const [id, setId] = useState<string>();

    const [refetch, { data }] = useLazyGetUserQuery();

    useImperativeHandle(ref, () => ({
      open(id: string) {
        open();
        setId(id);
        refetch(id);
      },
      close() {
        close();
        setId(undefined);
      },
    }));

    return (
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={4}>Edit User</Title>}
      >
        <Modal.Body>
          <FormProvider
            useMutate={useUpdateUserMutation}
            initialValues={{ id }}
            onSuccess={close}
          >
            {(form) => (
              <Stack>
                <TextInput
                  {...form.getInputProps("fullName")}
                  defaultValue={data?.data.fullName}
                  label="Nama"
                  placeholder="Masukan nama"
                />

                <SelectRole
                  {...form.getInputProps("roles")}
                  defaultValue={data?.data.roles.map((row) => row.id)}
                />
                <TextInput
                  {...form.getInputProps("username")}
                  defaultValue={data?.data.username}
                  label="Username"
                  placeholder="Masukan username"
                />
                <TextInput
                  {...form.getInputProps("password")}
                  label="Password"
                  placeholder="Masukan password"
                  type="password"
                />
                <Flex justify="end">
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
