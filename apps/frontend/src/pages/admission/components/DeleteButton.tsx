import { useDeleteAdmissionMutation } from "@/services/api/admission";
import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

export const ButtonDelete = ({ id }: { id: number }) => {
  const [mutate] = useDeleteAdmissionMutation();
  const onClick = useCallback(() => {
    modals.openConfirmModal({
      title: "Hapus Pendaftaran",
      centered: true,
      children: (
        <Text size="sm">Apakah anda akan menghapus pendaftaran ini?</Text>
      ),
      confirmProps: {
        color: "red",
      },
      onConfirm() {
        mutate(id);
      },
    });
  }, [id, mutate]);

  return (
    <Tooltip label="Hapus Obat">
      <ActionIcon color="red" variant="subtle" onClick={onClick}>
        <IconTrash />
      </ActionIcon>
    </Tooltip>
  );
};
