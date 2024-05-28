import {
  useGetDiagnoseQuery,
  usePutDiagnoseMutation,
} from "@/services/api/diagnose";
import { Textarea } from "@mantine/core";

interface OtherFieldProps {
  encounterId: string;
}

export const OtherField = ({ encounterId }: OtherFieldProps) => {
  const { data } = useGetDiagnoseQuery({ encounterId });
  const [mutate] = usePutDiagnoseMutation();

  return (
    <Textarea
      label="Keterangan"
      defaultValue={data?.data?.plan}
      onBlur={(e) => {
        mutate({
          encounterId,
          plan: e.currentTarget.value,
        });
      }}
    />
  );
};
