import {
  ActionIcon,
  Card,
  Flex,
  Group,
  ScrollArea,
  SimpleGrid,
  Table,
  Tooltip,
} from "@mantine/core";
import {
  IconEdit,
  IconStethoscope,
  IconUserScreen,
  IconUserShield,
} from "@tabler/icons-react";

export const Component = () => {
  return (
    <>
      <SimpleGrid cols={3}>
        <Card withBorder radius="md">
          Pasien hari ini
        </Card>

        <Card withBorder radius="md">
          Pasien hari ini
        </Card>

        <Card withBorder radius="md">
          Pasien hari ini
        </Card>
      </SimpleGrid>

      <Table withTableBorder striped highlightOnHover mt={24}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nama</Table.Th>
            <Table.Th>Usia</Table.Th>
            <Table.Th>
              <Group>
                <Tooltip label="Screening Awal">
                  <ActionIcon variant="subtle">
                    <IconStethoscope />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Lihat Profil Pasien">
                  <ActionIcon variant="subtle">
                    <IconUserScreen />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
      </Table>
    </>
  );
};
