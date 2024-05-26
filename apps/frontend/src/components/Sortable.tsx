import { ActionIcon } from "@mantine/core";
import { IconSortAscending2, IconSortDescending2 } from "@tabler/icons-react";
import { useCallback, useState } from "react";

type Sort = "ASC" | "DESC";

interface SortableProps {
  onChange: (value: Sort) => void;
}

export const Sortable = ({ onChange }: SortableProps) => {
  const [sort, setSort] = useState<Sort>("ASC");

  const onClick = useCallback(() => {
    const value = sort === "ASC" ? "DESC" : "ASC";
    setSort(value);
    onChange(value);
  }, [sort]);

  return (
    <ActionIcon variant="transparent" onClick={onClick}>
      {sort === "ASC" ? <IconSortAscending2 /> : <IconSortDescending2 />}
    </ActionIcon>
  );
};
