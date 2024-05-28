import { Button, Card, CardSection, Flex, Text, Title } from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { EditSection } from "./components/EditSection";
import { modals } from "@mantine/modals";
import {
  PatientCondition,
  useDeletePatientConditionMutation,
  useGetPatientConditionsQuery,
} from "@/services/api/patient-condition";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<number>>(null);

  const [deleteMutation] = useDeletePatientConditionMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between">
          <Title order={4}>Patient Condition</Title>
          <Button
            onClick={() => addSectionRef.current?.open()}
            leftSection={<IconPlus />}
          >
            Add New
          </Button>
        </Flex>

        <CardSection>
          <ProTable
            queryLoader={useGetPatientConditionsQuery}
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
              createProTableColumnActions<PatientCondition>({
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
                        title: (
                          <Title order={4}>Delete Patient Condition</Title>
                        ),
                        children: <Text>Are you sure?</Text>,
                        onConfirm() {
                          deleteMutation(row.id);
                        },
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
