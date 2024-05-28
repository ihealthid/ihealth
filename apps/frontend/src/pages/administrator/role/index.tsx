import { Button, Card, CardSection, Flex, Title } from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { useMemo, useRef } from "react";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import {
  Role,
  useDeleteRoleMutation,
  useGetRolesQuery,
} from "@/services/api/role";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { EditSection } from "./components/EditSection";
import { deleteConfirmation } from "@/utils/delete-confirmation-modal";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<number>>(null);
  const [deleteRole] = useDeleteRoleMutation();

  const table = useMemo(
    () => (
      <ProTable
        queryLoader={useGetRolesQuery}
        cols={[
          {
            keyIndex: "id",
            header: "ID",
          },
          {
            keyIndex: "name",
            header: "Name",
          },
          createProTableColumnActions<Role>({
            actions: [
              {
                icon: <IconPencil />,
                label: "Edit",
                onClick(row) {
                  editSectionRef?.current?.open(row.id);
                },
              },
              {
                icon: <IconTrash />,
                label: "Delete",
                onClick(row) {
                  deleteConfirmation("Delete Role", () => deleteRole(row.id));
                },
              },
            ],
          }),
        ]}
      />
    ),
    [editSectionRef]
  );

  return (
    <>
      <Card>
        <Flex justify="space-between">
          <Title order={4}>Role</Title>
          <Button
            onClick={() => addSectionRef.current?.open()}
            leftSection={<IconPlus />}
          >
            Add New
          </Button>
        </Flex>
        <CardSection mt={8}>{table}</CardSection>
      </Card>

      <AddSection ref={addSectionRef} />
      <EditSection ref={editSectionRef} />
    </>
  );
};
