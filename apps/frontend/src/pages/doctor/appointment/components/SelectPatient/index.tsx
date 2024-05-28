import { Patient } from "@/services/api/patient";
import { Modal, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useState } from "react";
import { TablePatient } from "./TablePatient";

interface SelectPatientProps {
  onChange?: (id: number | null) => void;
}

export const SelectPatient = ({ onChange }: SelectPatientProps) => {
  const [selected, setSelected] = useState<Patient | null>(null);
  const [opened, { open, close }] = useDisclosure();
  const [search, setSearch] = useState("");

  const onSelect = useCallback(
    (row: Patient) => {
      setSelected(row);
      close();
      onChange?.(row.id);
    },
    [setSelected, close, onChange]
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
          <TextInput
            placeholder="Cari berdasarkan ID/Nama/NIK"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearch(e.currentTarget.value.trim());
              }
            }}
          />
          <TablePatient search={search} onSelect={onSelect} />
        </Modal.Body>
      </Modal>
    </>
  );
};
