import { FileButton, Tooltip, ActionIcon } from "@mantine/core";
import { MutationDefinition } from "@reduxjs/toolkit/query";
import { IconFileImport } from "@tabler/icons-react";
import { UseMutation } from "node_modules/@reduxjs/toolkit/dist/query/react/buildHooks";

interface ButtonImportProps<QueryArg> {
  useMutation: UseMutation<MutationDefinition<QueryArg, any, any, any>>;
}

export const ButtonImport = <QueryArg,>({
  useMutation,
}: ButtonImportProps<QueryArg>) => {
  const [mutate] = useMutation();
  return (
    <FileButton
      onChange={(file) => {
        if (file) {
          //@ts-ignore
          mutate({ file });
        }
      }}
    >
      {(props) => (
        <Tooltip label="Import">
          <ActionIcon {...props} variant="subtle">
            <IconFileImport />
          </ActionIcon>
        </Tooltip>
      )}
    </FileButton>
  );
};
