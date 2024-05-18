import { Button, Card, CardSection, Flex, Title } from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { EditSection } from "./components/EditSection";
import {
  HealthcareService,
  useDeleteHealthcareServiceMutation,
  useGetHealthcareServicesQuery,
} from "@/services/api/healthcare-service";
import { deleteConfirmation } from "@/utils/delete-confirmation-modal";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<number>>(null);

  const [deleteMutation] = useDeleteHealthcareServiceMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between">
          <Title order={4}>Healthcare Service</Title>
          <Button
            onClick={() => addSectionRef.current?.open()}
            leftSection={<IconPlus />}
          >
            Add New
          </Button>
        </Flex>

        <CardSection>
          <ProTable
            queryLoader={useGetHealthcareServicesQuery}
            cols={[
              {
                keyIndex: "id",
                header: "ID",
              },
              {
                keyIndex: "name",
                header: "Name",
              },
              {
                keyIndex: "price",
                header: "Price",
              },
              createProTableColumnActions<HealthcareService>({
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
