import { Medication, useGetMedicationsQuery } from "@/services/api/medication";
import {
  Badge,
  Combobox,
  Group,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { useMap } from "@mantine/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";

interface SelectMedicationProps {
  value?: string | null;
  onChange(value: string | null, item?: Medication): void;
}

export const SelectMedication = ({
  onChange,
  value: val,
}: SelectMedicationProps) => {
  const combobox = useCombobox({
    onDropdownOpen() {
      combobox.focusSearchInput();
    },
  });
  const mapState = useMap<string, string>([]);
  const { data, isSuccess } = useGetMedicationsQuery({
    page: 1,
    limit: 10,
    ..._.fromPairs(Array.from(mapState.entries())),
  });

  const options = useMemo(
    () =>
      (data?.data ?? []).map((item) => (
        <Combobox.Option key={item.id} value={JSON.stringify(item)}>
          <Group>
            <Text>{item.name}</Text>
            <Badge variant="light">{item.doseForm.display}</Badge>
          </Group>
        </Combobox.Option>
      )),
    [data],
  );

  const [value, setValue] = useState<string | null>(null);

  const onSearch = useCallback((val: string) => {
    if (val.length > 2) {
      mapState.set("filter.name", "$or:$ilike:" + val);
      mapState.set("filter.ingredients.ingredient.name", "$or:$ilike:" + val);
    } else {
      mapState.clear();
    }
  }, []);

  useEffect(() => {
    if (val === null) {
      combobox.resetSelectedOption();
      setValue("");
    }
  }, [val]);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(value) => {
        const val = JSON.parse(value);
        onChange(val.id, val);
        setValue(val.name);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          label="Medication"
          placeholder="Select Medication"
          value={value ?? ""}
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
              onChange={(e) => {
                onSearch(e.currentTarget.value);
              }}
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
