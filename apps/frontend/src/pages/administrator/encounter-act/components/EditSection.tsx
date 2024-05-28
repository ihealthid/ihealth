import { FormProvider } from "@/components/form-provider";
import { Button, Flex, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { HealthcareServiceForm } from "./EncounterActForm";
import { DisclosureActionOnEdit } from "@/types/disclosure";
import {
  useLazyGetEncounterActQuery,
  useUpdateEncounterActMutation,
} from "@/services/api/encounter-act";

export const EditSection = forwardRef<DisclosureActionOnEdit<string>>(
  (_, ref) => {
    const [id, setId] = useState<string | undefined>();
    const [opened, { open, close }] = useDisclosure();
    const [fetcher, { data }] = useLazyGetEncounterActQuery();

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
        title={<Title order={4}>Edit Encounter Act</Title>}
        opened={opened}
        onClose={close}
      >
        <Modal.Body>
          <FormProvider
            useMutate={useUpdateEncounterActMutation}
            onSuccess={close}
            initialValues={{ id }}
          >
            {(form) => (
              <Stack>
                <HealthcareServiceForm form={form} defaultData={data?.data} />
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
