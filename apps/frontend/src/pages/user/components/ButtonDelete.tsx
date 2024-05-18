import { useDeleteUserMutation } from "@/services/api/user";
import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";

export const ButtonDelete = ({ id }: { id: number }) => {
  const [mutate] = useDeleteUserMutation();

  const onClick = useCallback(() => {
    modals.openConfirmModal({
      title: "Hapus Pengguna",
      centered: true,
      children: <Text size="sm">Apakah anda akan menghapus pengguna ini?</Text>,
      confirmProps: {
        color: "red",
      },
      onConfirm() {
        mutate(id);
      },
    });
  }, [id, mutate]);

  return (
    <Tooltip label="Hapus Pengguna">
      <ActionIcon color="red" variant="subtle" onClick={onClick}>
        <IconTrash />
      </ActionIcon>
    </Tooltip>
  );
};
