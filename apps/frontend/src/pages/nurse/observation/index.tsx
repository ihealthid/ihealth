import { FormProvider } from "@/components/form-provider";
import {
  useGetObservationByEncounterIdQuery,
  useUpdateObservationMutation,
} from "@/services/api/observation";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Menu,
  NumberInput,
  SimpleGrid,
  Skeleton,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { useMemo } from "react";
import { PatientProfile } from "@/features/PatientProfile";
import { useMap } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";

const fields = [
  {
    name: "height",
    label: "Tinggi Badan",
    Component: NumberInput,
  },
  {
    name: "weight",
    label: "Berat Badan",
    Component: NumberInput,
  },
  {
    name: "waistline",
    label: "Lingkar Pinggang",
    Component: NumberInput,
  },
  {
    name: "headCircumference",
    label: "Lingkar Kepala",
    Component: NumberInput,
  },
  {
    name: "temperature",
    label: "Suhu Badan",
    Component: NumberInput,
  },
  {
    name: "saturationOxygen",
    label: "Saturasi Oxygen",
    Component: NumberInput,
  },
  {
    name: "heartRate",
    label: "Detak Jantung",
    Component: NumberInput,
  },
  {
    name: "respiratoryRate",
    label: "Respiratory Rate",
    Component: NumberInput,
  },
  {
    name: "colesterole",
    label: "Kolesterol",
    Component: NumberInput,
  },
  {
    name: "uricAcid",
    label: "Asam Urat",
    Component: NumberInput,
  },
  {
    name: "glucose",
    label: "Gula Darah",
    Component: NumberInput,
  },
];

const defaultFields: [string, any][] = [
  [
    "anamnesis",
    {
      label: "Anamnesis",
      Component: Textarea,
    },
  ],
  [
    "systole",
    {
      label: "Systole",
      Component: NumberInput,
    },
  ],
  [
    "diastole",
    {
      label: "Diastole",
      Component: NumberInput,
    },
  ],
];

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const encounterId = params.id as string;
  const { data } = useGetObservationByEncounterIdQuery({
    encounterId,
  });

  const mapState = useMap([...defaultFields]);

  const computedFields = useMemo(
    () => fields.filter((f) => !mapState.has(f.name)),
    [mapState.size],
  );

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
    <Grid columns={5}>
      <Grid.Col span={2}>
        <PatientProfile encounterId={encounterId} onRendered={() => {}} />
      </Grid.Col>
      <Grid.Col span={3}>
        <Card withBorder>
          <Card.Section bg="pink" c="white" p="sm">
            <Title order={4}>Screening Awal</Title>
          </Card.Section>
          {data ? (
            <FormProvider
              useMutate={useUpdateObservationMutation}
              initialValues={{ encounterId }}
              onSuccess={() => {
                navigate("/nurse/waiting-list");
              }}
            >
              {(form) => (
                <Stack>
                  {Array.from(mapState.entries()).map(
                    ([name, { Component, ...inputProps }], index) => (
                      <Group align="end">
                        <Box style={{ flex: 1 }}>
                          <Component
                            {...form.getInputProps(name)}
                            {...inputProps}
                            defaultValue={computedData[name] ?? undefined}
                          />
                        </Box>
                        {index > 2 && (
                          <ActionIcon
                            variant="subtle"
                            onClick={() => mapState.delete(name)}
                          >
                            <IconTrash />
                          </ActionIcon>
                        )}
                      </Group>
                    ),
                  )}

                  <Flex justify="end" gap="md">
                    <Menu>
                      <Menu.Target>
                        <Button type="button" variant="subtle">
                          Tambah Field
                        </Button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {computedFields.map(({ name, ...inputProps }) => (
                          <Menu.Item
                            onClick={() => mapState.set(name, inputProps)}
                          >
                            {inputProps.label}
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                    <Button type="submit">Save</Button>
                  </Flex>
                </Stack>
              )}
            </FormProvider>
          ) : (
            <Skeleton />
          )}
        </Card>
      </Grid.Col>
    </Grid>
  );
};
