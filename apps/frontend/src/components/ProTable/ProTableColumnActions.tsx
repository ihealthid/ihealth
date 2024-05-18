import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { ProTableColumn } from "./useCreateProTableRows";

interface Action<TData> {
  icon: React.ReactNode;
  label: string;
  hidden?: (row: TData) => boolean;
  onClick?: (
    data: TData,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

interface CreateProTableColumnActionsProps<TData>
  extends Omit<ProTableColumn<TData>, "render"> {
  actions: Action<TData>[];
}

export const createProTableColumnActions = <TData,>({
  actions,
  ...props
}: CreateProTableColumnActionsProps<TData>) => ({
  ...props,
  render: (data: TData) => (
    <Group justify="end" wrap="nowrap">
      {actions.map((action) => {
        if (action.hidden && action.hidden(data)) {
          return null;
        }

        return (
          <Tooltip label={action.label}>
            <ActionIcon
              variant="subtle"
              onClick={(event) => action.onClick?.(data, event)}
            >
              {action.icon}
            </ActionIcon>
          </Tooltip>
        );
      })}
    </Group>
  ),
});
