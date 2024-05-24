import { ActionIcon } from "@mantine/core";
import { IconSortAscending2, IconSortDescending2 } from "@tabler/icons-react";
import { useCallback, useState } from "react";

type Sort = "asc" | "desc";

interface SortableProps {
  onChange: (value: Sort) => void;
}

export const Sortable = ({ onChange }: SortableProps) => {
  const [sort, setSort] = useState<Sort>("asc");

  const onClick = useCallback(() => {
    const value = sort === "asc" ? "desc" : "asc";
    setSort(value);
    onChange(value);
  }, [sort]);

  return (
    <ActionIcon variant="transparent" onClick={onClick}>
      {sort === "asc" ? <IconSortAscending2 /> : <IconSortDescending2 />}
    </ActionIcon>
  );
};
