import { FormProvider } from "@/components/form-provider";
import {
  useGetDiagnoseQuery,
  usePutDiagnoseMutation,
} from "@/services/api/diagnose";
import { SimpleGrid, Textarea } from "@mantine/core";

interface SOAPFormProps {
  encounterId: number;
}

export function SOAPForm({ encounterId }: Readonly<SOAPFormProps>) {
  const { data } = useGetDiagnoseQuery({
    encounterId,
  });

  return (
    <FormProvider
      useMutate={usePutDiagnoseMutation}
      initialValues={{
        encounterId,
      }}
    >
      {(_, mutate) => (
        <SimpleGrid cols={3}>
          <Textarea
            label="Subjective"
            onBlur={(e) => {
              mutate({
                encounterId,
                subjective: e.currentTarget.value,
              });
            }}
            defaultValue={data?.data?.subjective}
          />
          <Textarea
            label="Objective"
            onBlur={(e) => {
              mutate({
                encounterId,
                objective: e.currentTarget.value,
              });
            }}
            defaultValue={data?.data?.objective}
          />
          <Textarea
            label="Assessment"
            onBlur={(e) => {
              mutate({
                encounterId,
                assessment: e.currentTarget.value,
              });
            }}
            defaultValue={data?.data?.assessment}
          />
        </SimpleGrid>
      )}
    </FormProvider>
  );
}
