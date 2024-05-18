import {
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  Spoiler,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRef } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";
import { EditSection } from "./components/EditSection";
import { modals } from "@mantine/modals";
import {
  ParticipantTypeCode,
  useDeleteParticipantTypeCodeMutation,
  useGetParticipantTypeCodesQuery,
} from "@/services/api/participant-type-code";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<number>>(null);
  const [deleteMutation] = useDeleteParticipantTypeCodeMutation();

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center">
          <Title order={4}>Participant Type Code</Title>

          <Button
            leftSection={<IconPlus />}
            onClick={() => addSectionRef.current?.open()}
          >
            Add New
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetParticipantTypeCodesQuery}
            cols={[
              {
                keyIndex: "id",
                header: "ID",
              },
              {
                keyIndex: "display",
                header: "Display",
              },
              {
                keyIndex: "code",
                header: "Code",
              },
              {
                header: "Definition",
                render: (row) => (
                  <Spoiler
                    maxHeight={40}
                    showLabel="Show More"
                    hideLabel="Hide"
                    transitionDuration={150}
                  >
                    {row.definition}
                  </Spoiler>
                ),
              },
              {
                keyIndex: "status",
                header: "Status",
              },
              createProTableColumnActions<ParticipantTypeCode>({
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
                        title: <Title order={4}>Delete Code System</Title>,
                        onConfirm() {
                          deleteMutation(row.id);
                        },
                        children: <Text>Are you sure?</Text>,
                      });
                    },
                  },
                ],
              }),
            ]}
            headerSection={(setter) => (
              <Group p="md">
                <TextInput
                  placeholder="Search..."
                  onChange={(e) => setter("search", e.currentTarget.value)}
                />
              </Group>
            )}
          />
        </CardSection>
      </Card>

      <AddSection ref={addSectionRef} />
      <EditSection ref={editSectionRef} />
    </>
  );
};
