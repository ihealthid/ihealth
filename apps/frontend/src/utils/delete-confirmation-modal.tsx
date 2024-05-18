import { Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";

export const deleteConfirmation = (
  title: string,
  onConfirm: () => void,
  message = "Are you sure?"
) =>
  modals.openConfirmModal({
    title: <Title order={4}>{title}</Title>,
    children: <Text>{message}</Text>,
    onConfirm,
  });
