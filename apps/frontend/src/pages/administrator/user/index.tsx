import {
  Badge,
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  TextInput,
  Title,
} from "@mantine/core";
import { AddSection } from "./components/AddSection";
import { useRef } from "react";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { User, useGetUsersQuery } from "@/services/api/user";
import { usePaginateQuery } from "@/hooks/usePaginateQuery";
import { EditSection } from "./components/EditSection";
import { DisclosureAction, DisclosureActionOnEdit } from "@/types/disclosure";

export const Component = () => {
  const addSectionRef = useRef<DisclosureAction>(null);
  const editSectionRef = useRef<DisclosureActionOnEdit<string>>(null);
  const paginateQuery = usePaginateQuery();

  return (
    <>
      <Card>
        <Flex justify="space-between">
          <Title order={4}>Users</Title>
          <Button
            onClick={() => addSectionRef.current?.open()}
            leftSection={<IconPlus />}
          >
            Add New User
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetUsersQuery}
            query={paginateQuery.get()}
            cols={[
              {
                keyIndex: "fullName",
                header: "Full Name",
              },
              {
                keyIndex: "username",
                header: "Username",
              },
              {
                header: "Role",
                render: (row) => (
                  <Group>
                    {row.roles.map((row) => (
                      <Badge>{row.name}</Badge>
                    ))}
                  </Group>
                ),
              },
              createProTableColumnActions<User>({
                actions: [
                  {
                    icon: <IconEdit />,
                    label: "Edit",
                    onClick: (row) => {
                      editSectionRef.current?.open(row.id);
                    },
                  },
                ],
              }),
            ]}
            headerSection={() => (
              <Group p="md">
                <TextInput
                  placeholder="Pencarian"
                  onChange={(e) => {
                    paginateQuery.set(
                      "filter.username",
                      "$ilike:" + e.currentTarget.value,
                    );
                  }}
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
