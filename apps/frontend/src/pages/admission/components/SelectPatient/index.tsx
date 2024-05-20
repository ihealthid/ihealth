import { Patient } from "@/services/api/patient";
import { Group, Modal, Select, TextInput, Title } from "@mantine/core";
import { useDisclosure, useSetState } from "@mantine/hooks";
import { useCallback, useState } from "react";
import { TablePatient } from "./TablePatient";

const searchOptions = [
  {
    value: "fullName:iLike",
    label: "Find by name",
  },
  {
    value: "identifies.value:iLike",
    label: "Find by NIK",
  },
];

interface SelectPatientProps {
  onChange?: (id: string | null) => void;
}

export const SelectPatient = ({ onChange }: SelectPatientProps) => {
  const [selected, setSelected] = useState<Patient | null>(null);
  const [opened, { open, close }] = useDisclosure();
  const [search, setSearch] = useSetState({
    key: searchOptions[0].value,
    value: "",
  });

  const onSelect = useCallback(
    (row: Patient) => {
      setSelected(row);
      close();
      onChange?.(row.id);
    },
    [setSelected, close, onChange],
  );

  return (
    <>
      <TextInput
        label="Pasien"
        placeholder="Pilih pasien"
        value={selected?.fullName}
        readOnly
        onClick={open}
      />
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title={<Title order={4}>Cari Pasien</Title>}
      >
        <Modal.Body>
          <Group>
            <Select
              value={search.key}
              data={searchOptions}
              onChange={(e) => e && setSearch({ key: e })}
            />
            <TextInput
              style={{ flex: 1 }}
              placeholder="Search..."
              onChange={(e) => {
                setSearch({ value: e.currentTarget.value.trim() });
              }}
            />
          </Group>
          <TablePatient
            search={{
              [search.key]: search.value,
            }}
            onSelect={onSelect}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
