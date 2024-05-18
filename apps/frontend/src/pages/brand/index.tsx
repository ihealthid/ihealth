import {
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  TextInput,
  Title,
} from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { EditSection } from "./components/EditSection";
import { deleteConfirmation } from "@/utils/delete-confirmation-modal";
import {
  Brand,
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "@/services/api/brand";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<number>>(null);
  const [deleteMutation] = useDeleteBrandMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <Title order={4}>Brand</Title>

          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Add Brand
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetBrandsQuery}
            headerSection={(filter) => (
              <Group p="md">
                <TextInput
                  placeholder="Search ..."
                  onChange={(e) =>
                    filter({
                      "name:iLike": e.currentTarget.value,
                    })
                  }
                />
              </Group>
            )}
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
                keyIndex: "manufacture.name",
                header: "Manufacture",
              },
              createProTableColumnActions<Brand>({
                keyIndex: "id",
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
                      deleteConfirmation("Delete Brand", () =>
                        deleteMutation(row.id)
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
