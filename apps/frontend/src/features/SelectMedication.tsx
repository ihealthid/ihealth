import { Medication, useGetMedicationsQuery } from "@/services/api/medication";
import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useMemo, useState } from "react";

interface SelectMedicationProps {
  onChange(value: number | null, item?: Medication): void;
}

export const SelectMedication = ({ onChange }: SelectMedicationProps) => {
  const combobox = useCombobox({
    onDropdownOpen() {
      combobox.focusSearchInput();
    },
  });
  const [search, setSearch] = useDebouncedState("", 1000);
  const { data, isSuccess } = useGetMedicationsQuery({
    page: 1,
    limit: 20,
    search,
  });

  const options = useMemo(
    () =>
      (data?.data ?? []).map((item) => (
        <Combobox.Option key={item.id} value={JSON.stringify(item)}>
          {item.name}
        </Combobox.Option>
      )),
    [data]
  );

  const [value, setValue] = useState("");

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(value) => {
        const val = JSON.parse(value);
        onChange(value ? parseInt(val.id, 10) : null, val);
        setValue(val.name);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          label="Medication"
          placeholder="Select Medication"
          value={value}
          onFocus={() => combobox.openDropdown()}
          onClick={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
          readOnly
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        {isSuccess || options.length > 0 ? (
          <>
            <Combobox.Search
              placeholder="Search..."
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <Combobox.Options>{options}</Combobox.Options>
          </>
        ) : (
          <Combobox.Empty />
        )}
      </Combobox.Dropdown>
    </Combobox>
  );
};
