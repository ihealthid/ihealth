import {
  Fieldset,
  InputLabel,
  SimpleGrid,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { SelectProvince } from "./SelectProvince";
import { SelectRegency } from "./SelectRegency";
import { SelectDistrict } from "./SelectDistrict";
import { SelectVillage } from "./SelectVillage";
import { AddressInput } from "@/services/api/patient";
import { useSetState } from "@mantine/hooks";

interface AddressPickerProps {
  onChange?: (values: Partial<AddressInput>) => void;
  defaultValues?: Partial<AddressInput>;
}

export const AddressPicker = ({
  onChange,
  defaultValues = {
    provinceId: null,
    regencyId: null,
    districtId: null,
    villageId: null,
    address: null,
    rt: null,
    rw: null,
    no: null,
    block: null,
    floor: null,
  },
}: AddressPickerProps) => {
  const [state, setState] = useSetState(defaultValues);

  return (
    <Fieldset legend={<InputLabel>Alamat</InputLabel>}>
      <Stack>
        <SelectProvince
          value={state.provinceId}
          onChange={(val) => {
            setState({
              provinceId: val,
              regencyId: null,
            });
          }}
        />

        <SelectRegency
          key={state.provinceId}
          provinceId={state.provinceId}
          value={state.regencyId}
          onChange={(val) => {
            setState({
              regencyId: val,
              districtId: null,
            });
          }}
        />

        <SelectDistrict
          key={state.regencyId}
          regencyId={state.regencyId}
          value={state.districtId}
          onChange={(val) => {
            setState({
              districtId: val,
              villageId: null,
            });
          }}
        />

        <SelectVillage
          key={state.districtId}
          districtId={state.districtId}
          value={state.villageId}
          onChange={(val) => {
            setState({
              villageId: val,
            });
          }}
        />

        <Textarea
          label="Alamat"
          placeholder="Masukan alamat"
          defaultValue={state?.address ?? undefined}
          onChange={(e) => {
            onChange?.({
              ...state,
              address: e.currentTarget?.value,
            });
            setState({ address: e.currentTarget.value });
          }}
        />

        <SimpleGrid cols={2}>
          <TextInput
            label="RT"
            value={state.rt ?? undefined}
            onChange={(e) => {
              setState({
                rt: e.currentTarget.value,
              });
              onChange?.({
                ...state,
                rt: e.currentTarget?.value,
              });
            }}
          />
          <TextInput
            label="RW"
            value={state.rw ?? undefined}
            onChange={(e) => {
              setState({
                rw: e.currentTarget.value,
              });
              onChange?.({
                ...state,
                rw: e.currentTarget?.value,
              });
            }}
          />
          <TextInput
            label="Blok"
            value={state.block ?? undefined}
            onChange={(e) => {
              setState({ block: e.currentTarget.value });
              onChange?.({
                ...state,
                block: e.currentTarget?.value,
              });
            }}
          />
          <TextInput
            label="No"
            value={state.no ?? undefined}
            onChange={(e) => {
              setState({ no: e.currentTarget.value });
              onChange?.({
                ...state,
                no: e.currentTarget?.value,
              });
            }}
          />
          <TextInput
            label="Lantai"
            value={state.floor ?? undefined}
            onChange={(e) => {
              setState({ floor: e.currentTarget.value });
              onChange?.({
                ...state,
                floor: e.currentTarget?.value,
              });
            }}
          />
        </SimpleGrid>
      </Stack>
    </Fieldset>
  );
};
