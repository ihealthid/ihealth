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
import { AddSection, AddSectionRef } from "./components/AddSection";
import { useRef } from "react";
import { IconPlus } from "@tabler/icons-react";
import { ProTable } from "@/components/ProTable";
import { useGetUsersQuery } from "@/services/api/user";

export const Component = () => {
  const addSectionRef = useRef<AddSectionRef>(null);

  return (
    <>
      <Card>
        <Flex justify="space-between">
          <Title order={4}>Daftar Pengguna</Title>
          <Button
            onClick={() => addSectionRef.current?.open()}
            leftSection={<IconPlus />}
          >
            Tambah
          </Button>
        </Flex>
        <CardSection>
          <ProTable
            queryLoader={useGetUsersQuery}
            cols={[
              {
                keyIndex: "id",
                header: "ID",
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
            ]}
            headerSection={(setter) => (
              <Group p="md">
                <TextInput
                  placeholder="Pencarian"
                  onChange={(e) => {
                    setter({
                      "username:iLike": e.currentTarget.value,
                    });
                  }}
                />
              </Group>
            )}
          />
        </CardSection>
      </Card>
      <AddSection ref={addSectionRef} />
    </>
  );
};
