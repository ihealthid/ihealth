import { Button, Card, CardSection, Flex, Title } from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { EditSection } from "./components/EditSection";
import { deleteConfirmation } from "@/utils/delete-confirmation-modal";
import {
  EncounterAct,
  useDeleteEncounterActMutation,
  useGetEncounterActsQuery,
} from "@/services/api/encounter-act";
import { useParams } from "react-router-dom";
import {
  EncounterActConsumable,
  useGetEncounterActConsumablesQuery,
} from "@/services/api/encounter-act-consumable";

export const Component = () => {
  const params = useParams();
  const encounterActId = params.encounterActId as string;
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<string>>(null);

  const [deleteMutation] = useDeleteEncounterActMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between">
          <Title order={4}>Encounter Act Consumable</Title>
          <Button
            onClick={() => addSectionRef.current?.open()}
            leftSection={<IconPlus />}
          >
            Add New
          </Button>
        </Flex>

        <CardSection>
          <ProTable
            queryLoader={useGetEncounterActConsumablesQuery}
            queryParams={{
              "encounterActId:of": encounterActId,
            }}
            cols={[
              {
                keyIndex: "consumable.name",
                header: "Name",
              },
              {
                keyIndex: "quantity",
                header: "Quantity",
              },
              {
                keyIndex: "consumable.price",
                header: "Price",
              },
              createProTableColumnActions<EncounterActConsumable>({
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
                      deleteConfirmation("Delete Healthcare Service", () =>
                        deleteMutation(row.id),
                      );
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
