import { Box, Button, Group, Modal, ModalBody, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SelectAct } from "./SelectAct";
import { SelectUser } from "./SelectUser";
import { FormProvider } from "@/components/form-provider";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import {
  DiagnoseEncounterAct,
  useCreateDiagnoseEncounterActMutation,
  useDeleteDiagnoseEncounterActMutation,
  useGetDiagnoseEncounterActsQuery,
} from "@/services/api/diagnose-encounter-act";
import { SelectConsumable } from "../../../../features/SelectConsumable";
import { IconTrash } from "@tabler/icons-react";
import { deleteConfirmation } from "@/utils/delete-confirmation-modal";

interface EncounterActProps {
  encounterId: string;
}

export const EncounterAct = ({ encounterId }: EncounterActProps) => {
  const [opened, { open, close }] = useDisclosure();

  const [deleteMutate] = useDeleteDiagnoseEncounterActMutation();

  return (
    <Box p="md">
      <Button onClick={open}>Add</Button>

      <ProTable
        queryLoader={useGetDiagnoseEncounterActsQuery}
        queryParams={{
          "encounterId:of": encounterId,
        }}
        cols={[
          {
            header: "Action",
            keyIndex: "encounterAct.display",
          },
          {
            header: "User",
            keyIndex: "user.fullName",
          },
          {
            header: "Consumable",
            keyIndex: "consumable.name",
          },
          createProTableColumnActions<DiagnoseEncounterAct>({
            actions: [
              {
                label: "Delete",
                icon: <IconTrash />,
                onClick: (row) => {
                  deleteConfirmation("Delete Consumable", () => {
                    deleteMutate(row.id);
                  });
                },
              },
            ],
          }),
        ]}
      />

      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={4}>Tindakan</Title>}
      >
        <ModalBody>
          <FormProvider
            useMutate={useCreateDiagnoseEncounterActMutation}
            initialValues={{ encounterId }}
            onSuccess={close}
          >
            {(form) => (
              <>
                <SelectAct {...form.getInputProps("encounterActId")} />
                <SelectUser {...form.getInputProps("userId")} />
                <SelectConsumable {...form.getInputProps("consumableId")} />
                <Group justify="end" mt="md">
                  <Button type="submit">Save</Button>
                </Group>
              </>
            )}
          </FormProvider>
        </ModalBody>
      </Modal>
    </Box>
  );
};
