import { useGetParticipantTypeCodesQuery } from "@/services/api/participant-type-code";
import { Select, SelectProps } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useMemo } from "react";

interface SelectParticipantTypeCodeProps
  extends Omit<SelectProps, "data" | "value" | "defaultValue" | "onChange"> {
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (value: number | null) => void;
}

export const SelectParticipantTypeCode = ({
  value,
  defaultValue,
  onChange,
  ...props
}: SelectParticipantTypeCodeProps) => {
  const [search, setSearch] = useInputState("");
  const { data } = useGetParticipantTypeCodesQuery({
    search,
    page: 1,
    limit: 10,
  });

  const options = useMemo(
    () =>
      data
        ? data.data.map((item) => ({
            label: item.display,
            value: item.id.toString(),
          }))
        : [],
    [data]
  );

  return (
    <Select
      {...props}
      label="Participant Type Code Parent"
      searchable
      onSearchChange={setSearch}
      clearable
      data={options}
      onChange={(e) => {
        onChange?.(e ? parseInt(e) : null);
      }}
    />
  );
};
