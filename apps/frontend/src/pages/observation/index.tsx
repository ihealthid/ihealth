import { FormProvider } from "@/components/form-provider";
import {
  useGetObservationByEncounterIdQuery,
  useUpdateObservationMutation,
} from "@/services/api/observation";
import {
  Button,
  Card,
  Flex,
  NumberInput,
  SimpleGrid,
  Skeleton,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { useMemo } from "react";

export const Component = () => {
  const params = useParams();
  const encounterId = params.id as string;
  const { data } = useGetObservationByEncounterIdQuery({
    encounterId,
  });

  const computedData = useMemo(() => {
    const c = _.map(data?.data.entries, (item) => ({
      [item.code]:
        item.type === "number"
          ? parseInt(item.value)
          : item.type === "string"
            ? item.value
            : item.value === "true"
              ? true
              : false,
    }));

    return _.reduce(
      c,
      (acc, current) => {
        for (const key in current) {
          if (!acc[key]) {
            acc[key] = null;
          }

          acc[key] = current[key];
        }
        return acc;
      },
      {} as any,
    );
  }, [data]);

  return (
    <Card>
      <Title order={4} mb="md">
        Observation
      </Title>
      {data ? (
        <FormProvider
          useMutate={useUpdateObservationMutation}
          initialValues={{ encounterId }}
          redirect="/waiting-list"
        >
          {(form) => (
            <Stack>
              <SimpleGrid cols={2}>
                <NumberInput
                  {...form.getInputProps("systole")}
                  label="Systole"
                  placeholder="Masukan systole"
                  defaultValue={computedData.systole ?? undefined}
                />
                <NumberInput
                  {...form.getInputProps("diastole")}
                  label="Diastole"
                  placeholder="Masukan diastole"
                  defaultValue={computedData.diastole ?? undefined}
                />
                <NumberInput
                  {...form.getInputProps("height")}
                  label="Tinggi Badan"
                  placeholder="Masukan tinggi badan"
                  defaultValue={computedData.height ?? undefined}
                />
                <NumberInput
                  {...form.getInputProps("weight")}
                  label="Berat Badan"
                  placeholder="Masukan berat badan"
                  defaultValue={computedData.weight ?? undefined}
                />
                <NumberInput
                  {...form.getInputProps("waistline")}
                  label="Lingkar Pinggang"
                  placeholder="Masukan lingkar pinggang"
                  defaultValue={computedData.waistline ?? undefined}
                />
                <NumberInput
                  {...form.getInputProps("headCircumference")}
                  label="Lingkar Kepala"
                  placeholder="Masukan lingkar kepala"
                  defaultValue={computedData.headCircumference ?? undefined}
                />
                <NumberInput
                  {...form.getInputProps("temperature")}
                  label="Suhu Badan"
                  placeholder="Masukan suhu badan"
                  defaultValue={computedData.temperature ?? undefined}
                />
                <NumberInput
                  {...form.getInputProps("saturationOxygen")}
                  label="Sarutasi Oksigen"
                  placeholder="Masukan sarutasi oksigen"
                  defaultValue={computedData.saturationOxygen ?? undefined}
                />
                <NumberInput
                  {...form.getInputProps("heartRate")}
                  label="Detak Jantung"
                  placeholder="Masukan detak jantung"
                  defaultValue={computedData.heartRate ?? undefined}
                />
                <NumberInput
                  {...form.getInputProps("respiratoryRate")}
                  label="Respiratory Rate"
                  placeholder="Masukan respiratory rate"
                  defaultValue={computedData.respiratoryRate ?? undefined}
                />
                <Textarea
                  {...form.getInputProps("anamnesis")}
                  label="Anamnesis"
                  placeholder="Masukan anamnesis"
                  defaultValue={computedData.anamnesis ?? undefined}
                  required
                />
              </SimpleGrid>
              <Flex justify="end">
                <Button type="submit">Save</Button>
              </Flex>
            </Stack>
          )}
        </FormProvider>
      ) : (
        <Skeleton />
      )}
    </Card>
  );
};
