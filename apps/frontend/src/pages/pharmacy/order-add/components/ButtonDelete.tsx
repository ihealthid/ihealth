import { useDeletePrescriptionItemMutation } from "@/services/api/prescription-item";
import { Tooltip, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export const ButtonDelete = ({ id }: { id: number }) => {
  const [mutate] = useDeletePrescriptionItemMutation();

  return (
    <Tooltip label="Hapus">
      <ActionIcon variant="subtle" onClick={() => mutate(id)}>
        <IconTrash />
      </ActionIcon>
    </Tooltip>
  );
};
