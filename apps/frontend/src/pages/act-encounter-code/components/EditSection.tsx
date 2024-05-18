import { FormProvider } from "@/components/form-provider";
import { DisclosureActionOnEdit } from "@/types/disclosure";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ActEncounterCodeForm } from "./ActEncounterCodeForm";
import {
  useLazyGetActEncounterCodeQuery,
  useUpdateActEncounterCodeMutation,
} from "@/services/api/act-encounter-code";

export const EditSection = forwardRef<DisclosureActionOnEdit<number>>(
  (_, ref) => {
    const [id, setId] = useState<number | undefined>();
    const [opened, { open, close }] = useDisclosure();
    const [fetcher, { data }] = useLazyGetActEncounterCodeQuery();

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
        title={<Title order={4}>Edit Act Encounter Code</Title>}
      >
        <Modal.Body>
          <FormProvider
            useMutate={useUpdateActEncounterCodeMutation}
            onSuccess={close}
            initialValues={{ id }}
          >
            {(form) => (
              <Stack>
                <ActEncounterCodeForm form={form} defaultData={data?.data} />
                <Flex justify="end">
                  <Button type="submit">Save</Button>
                </Flex>
              </Stack>
            )}
          </FormProvider>
        </Modal.Body>
      </Modal>
    );
  }
);
