import { FormProvider } from "@/components/form-provider";
import { useAccessToken } from "@/hooks/access-token";
import { usePostLoginMutation } from "@/services/api/auth";
import { Box, Button, Flex, Stack, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const Component = () => {
  const [, setAccessToken] = useAccessToken();
  const navigate = useNavigate();

  return (
    <Flex mih="100vh">
      <Box style={{ flex: 1 }}></Box>
      <Flex w={300} justify="center" align="center">
        <FormProvider
          useMutate={usePostLoginMutation}
          onSuccess={({ data }) => {
            setAccessToken(data.accessToken);
            navigate("/");
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
  );
};
