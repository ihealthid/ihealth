import { Button, Card, CardSection, Flex, Text, Title } from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { EditSection } from "./components/EditSection";
import { modals } from "@mantine/modals";

import {
  EncounterStatus,
  useDeleteEncounterStatusMutation,
  useGetEncounterStatusesQuery,
} from "@/services/api/encounter-status";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<number>>(null);
  const [deleteVisual] = useDeleteEncounterStatusMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center" mb="md">
          <Title order={4}>Encounter Status</Title>

          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Add New
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetEncounterStatusesQuery}
            cols={[
              {
                keyIndex: "id",
                header: "ID",
              },
              {
                keyIndex: "code",
                header: "Code",
              },
              {
                keyIndex: "display",
                header: "Display",
              },
              {
                keyIndex: "definition",
                header: "Definition",
              },
              createProTableColumnActions<EncounterStatus>({
                actions: [
                  {
                    icon: <IconEdit />,
                    label: "Edit",
                    onClick(row) {
                      editSectionRef.current?.open(row.id);
                    },
                  },
                  {
                    icon: <IconTrash />,
                    label: "Delete",
                    onClick(row) {
                      modals.openConfirmModal({
                        title: <Title order={4}>Delete Encounter Status</Title>,
                        onConfirm() {
                          deleteVisual(row.id);
                        },
                        children: <Text>Are you sure?</Text>,
                      });
                    },
                  },
                ],
              }),
            ]}
          />
        </CardSection>
      </Card>

      <AddSection ref={addSectionRef} />
      <EditSection ref={editSectionRef} />
    </>
  );
};
