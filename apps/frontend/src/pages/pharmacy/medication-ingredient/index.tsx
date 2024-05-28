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
  MedicationIngredient,
  useDeleteMedicationIngredientMutation,
  useGetMedicationIngredientsQuery,
} from "@/services/api/medication-ingredient";
import { useParams } from "react-router-dom";
import { usePaginateQuery } from "@/hooks/usePaginateQuery";

export const Component = () => {
  const params = useParams();
  const medicationId = params.medicationId as string;

  const queryParam = usePaginateQuery({
    "filter.medicationId": "$eq:" + medicationId,
  });
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<string>>(null);
  const [deleteMutation] = useDeleteMedicationIngredientMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <Title order={4}>Medication Ingredient</Title>

          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Add Ingredient
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetMedicationIngredientsQuery}
            query={queryParam.get()}
            headerSection={() => (
              <Group p="md">
                <TextInput
                  placeholder="Search ..."
                  onChange={(e) =>
                    queryParam.set(
                      "filter.name",
                      "$ilike:" + e.currentTarget.value,
                    )
                  }
                />
              </Group>
            )}
            cols={[
              {
                keyIndex: "ingredient.name",
                header: "Ingredient Name",
              },
              {
                keyIndex: "quantity",
                header: "Quantity",
              },
              {
                keyIndex: "unit",
                header: "Unit",
              },
              createProTableColumnActions<MedicationIngredient>({
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
