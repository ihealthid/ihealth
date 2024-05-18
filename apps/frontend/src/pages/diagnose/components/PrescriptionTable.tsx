import { useLazyGetPrescriptionByEncounterIdQuery } from "@/services/api/prescription";
import { useDeletePrescriptionItemMutation } from "@/services/api/prescription-item";
import { Table, Flex, Tooltip, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";

export const PrescriptionTable = ({
  encounterId,
  id,
}: {
  encounterId: number;
  id: string;
}) => {
  const [refetch, { data }] = useLazyGetPrescriptionByEncounterIdQuery();
  const [deleteMutate] = useDeletePrescriptionItemMutation();

  useEffect(() => {
    refetch(encounterId);
  }, [encounterId, refetch, id]);

  return (
    <Table withTableBorder striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>No</Table.Th>
          <Table.Th>Medication</Table.Th>
          <Table.Th>Quantity</Table.Th>
          <Table.Th>Doses / Frequency</Table.Th>
          <Table.Th>Note</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.data?.items?.map((item, i) => (
          <Table.Tr key={item.id}>
            <Table.Td>{i + 1}</Table.Td>
            <Table.Td>{item.medication.name}</Table.Td>
            <Table.Td>{item.quantity}</Table.Td>
            <Table.Td>
              {item.doses} / {item.frequency}
            </Table.Td>
            <Table.Td>{item.note}</Table.Td>
            <Table.Td>
              <Flex justify="end">
                <Tooltip label="Delete">
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => {
                      deleteMutate(item.id).then(() => {
                        refetch(encounterId);
                      });
                    }}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Tooltip>
              </Flex>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
