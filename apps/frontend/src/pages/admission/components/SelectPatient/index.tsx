import { Patient, useGetPatientsQuery } from "@/services/api/patient";
import { Group, Modal, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useState } from "react";
import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import { humanizedDate } from "@/utils/date";
import { IconChecklist } from "@tabler/icons-react";
import { usePaginateQuery } from "@/hooks/usePaginateQuery";
import _ from "lodash";

interface SelectPatientProps {
  onChange?: (id: string | null) => void;
}

export const SelectPatient = ({ onChange }: SelectPatientProps) => {
  const paginateQuery = usePaginateQuery();
  const [selected, setSelected] = useState<Patient | null>(null);
  const [opened, { open, close }] = useDisclosure();

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
          <ProTable
            queryLoader={useGetPatientsQuery}
            query={paginateQuery.get()}
            cols={[
              {
                keyIndex: "fullName",
                header: "Name",
              },
              {
                header: "Born Date",
                render: (row) => humanizedDate(row.birthDate),
              },
              createProTableColumnActions<Patient>({
                actions: [
                  {
                    icon: <IconChecklist />,
                    label: "Select",
                    onClick: (row) => {
                      onSelect(row);
                    },
                  },
                ],
              }),
            ]}
            headerSection={(q) => (
              <Group>
                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Search..."
                  onChange={(e) => {
                    const val = e.currentTarget.value;
                    if (_.isEmpty(val)) {
                      q.delete("filter.fullName");
                      q.delete("filter.identifies.value");
                    } else {
                      q.set("filter.fullName", "$or:$ilike:" + val);
                      q.set("filter.identifies.value", "$or:$ilike:" + val);
                    }
                  }}
                />
              </Group>
            )}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
