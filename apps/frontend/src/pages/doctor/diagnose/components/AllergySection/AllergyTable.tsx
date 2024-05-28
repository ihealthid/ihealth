import { useGetPatientAllergyQuery } from "@/services/api/allergy";
import { Table } from "@mantine/core";
import { useMemo } from "react";

interface AllergyTableProps {
  encounterId: string;
}

export const AllergyTable = ({ encounterId }: AllergyTableProps) => {
  const { data } = useGetPatientAllergyQuery({
    page: 1,
    limit: 20,
    "filter.encounterId": "$eq:" + encounterId,
  });

  const rows = useMemo(
    () =>
      data?.data.map((row) => (
        <Table.Tr key={row.id}>
          <Table.Td>{row.allergy.name}</Table.Td>
          <Table.Td>{row.severity}</Table.Td>
          <Table.Td></Table.Td>
        </Table.Tr>
      )) ?? [],
    [data],
  );

  return (
    <Table withTableBorder striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nama</Table.Th>
          <Table.Th>Level</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
