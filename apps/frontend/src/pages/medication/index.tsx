import {
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  NumberFormatter,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { AddSection } from "./components/AddSection";
import {
  IconBox,
  IconEdit,
  IconLeaf,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import {
  Medication,
  useDeleteMedicationMutation,
  useGetMedicationsQuery,
} from "@/services/api/medication";
import { useNavigate } from "react-router-dom";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { EditSection } from "./components/EditSection";
import { deleteConfirmation } from "@/utils/delete-confirmation-modal";
import { Sortable } from "@/components/Sortable";
import { usePaginateQuery } from "@/hooks/usePaginateQuery";

export const Component = () => {
  const navigate = useNavigate();
  const paginateQuery = usePaginateQuery();
  const [sort, setSort] = useState<string[]>([]);
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<string>>(null);
  const [deleteMedication] = useDeleteMedicationMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <Title order={4}>Medication</Title>

          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Add New
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetMedicationsQuery}
            query={paginateQuery.get()}
            sort={sort}
            headerSection={() => (
              <Group p="md">
                <TextInput
                  placeholder="Search ..."
                  onChange={(e) =>
                    paginateQuery.set(
                      "filter.name",
                      "$ilike:" + e.currentTarget.value,
                    )
                  }
                />
              </Group>
            )}
            cols={[
              {
                keyIndex: "name",
                header: (
                  <Group>
                    <Text>Name</Text>
                    <Sortable onChange={(val) => setSort([`name:${val}`])} />
                  </Group>
                ),
              },
              {
                keyIndex: "bpom",
                header: "BPOM",
              },
              {
                keyIndex: "price",
                header: "Price",
                render: (row) => (
                  <NumberFormatter value={row.price} thousandSeparator />
                ),
              },
              {
                keyIndex: "doseForm.display",
                header: "Dose Form",
              },
              createProTableColumnActions<Medication>({
                keyIndex: "id",
                actions: [
                  {
                    icon: <IconLeaf />,
                    label: "Ingredients",
                    onClick: (row) => {
                      navigate(`/medication-ingredient/${row.id}`);
                    },
                  },
                  {
                    icon: <IconBox />,
                    label: "Stocks",
                    onClick(row) {
                      navigate(`/medication-stock/${row.id}`);
                    },
                  },
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
                      deleteConfirmation("Delete Medication", () =>
                        deleteMedication(row.id),
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
