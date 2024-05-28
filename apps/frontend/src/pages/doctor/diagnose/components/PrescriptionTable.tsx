import { ProTable, createProTableColumnActions } from "@/components/ProTable";
import {
  PrescriptionItem,
  useDeletePrescriptionItemMutation,
  useGetPrescriptionItemsQuery,
} from "@/services/api/prescription-item";
import { IconTrash } from "@tabler/icons-react";

export const PrescriptionTable = ({ encounterId }: { encounterId: string }) => {
  const [deleteMutate] = useDeletePrescriptionItemMutation();

  return (
    <>
      <ProTable
        queryLoader={useGetPrescriptionItemsQuery}
        query={{
          "filter.prescription.encounterId": "$eq:" + encounterId,
        }}
        cols={[
          {
            header: "No",
            render: (_, index) => index + 1,
          },
          {
            header: "Medication",
            keyIndex: "medication.name",
          },
          {
            header: "Quantity",
            keyIndex: "quantity",
          },
          {
            header: "Dose",
            keyIndex: "doses",
          },
          {
            header: "Freq",
            keyIndex: "frequency",
          },
          {
            header: "Note",
            keyIndex: "note",
          },
          createProTableColumnActions<PrescriptionItem>({
            actions: [
              {
                icon: <IconTrash />,
                label: "Delete",
                onClick: (data) => deleteMutate(data.id),
              },
            ],
          }),
        ]}
      />
    </>
  );
};
