import { FormProvider } from "@/components/form-provider";
import { useAccessToken } from "@/hooks/access-token";
import { usePostLoginMutation } from "@/services/api/auth";
import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  ModalBody,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Component = () => {
  const [opened, { open, close }] = useDisclosure();
  const [roles, setRoles] = useState<any[]>([]);
  const [, setAccessToken] = useAccessToken();
  const navigate = useNavigate();

  const onSuccess = useCallback((data: any) => {
    setAccessToken(data.accessToken);

    if (data.user.roles.length > 1) {
      setRoles(data.user.roles);
      open();
    } else {
      navigate("/" + data.user.roles[0].name?.toLowerCase());
    }
  }, []);

  return (
    <>
      <Flex mih="100vh">
        <Box style={{ flex: 1 }}></Box>
        <Flex w={300} justify="center" align="center">
          <FormProvider
            useMutate={usePostLoginMutation}
            onSuccess={({ data }) => {
              onSuccess(data);
            }}
          >
            {(form) => (
              <Stack>
                <TextInput
                  {...form.getInputProps("username")}
                  label="Username"
                  placeholder="Enter Username"
                />
                <TextInput
                  {...form.getInputProps("password")}
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                />
                <Button type="submit" fullWidth>
                  Login
                </Button>
              </Stack>
            )}
          </FormProvider>
        </Flex>
      </Flex>

      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={4}>Select Role</Title>}
      >
        <ModalBody>
          <Group>
            {roles.map((row) => (
              <Button onClick={() => navigate("/" + row.name?.toLowerCase())}>
                {row.name}
              </Button>
            ))}
          </Group>
        </ModalBody>
      </Modal>
    </>
  );
};
