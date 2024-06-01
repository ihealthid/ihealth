import { Stack, TextInput } from "@mantine/core";
import { SelectGender } from "./SelectGender";
import { DateInput } from "@mantine/dates";
import { AddressPicker } from "@/features/AddressPicker";
import { UseFormReturnType } from "@mantine/form";
import { AddressInput } from "@/services/api/patient";
import { useMemo } from "react";

interface PatientFormProps {
  form: UseFormReturnType<any>;
  defaultData?: Record<string, any>;
}

export const PatientForm = ({ form, defaultData }: PatientFormProps) => {
  const identifies = useMemo(() => {
    if (!defaultData) return {};

    const o: {
      [key: string]: string;
    } = {};
    for (const i of defaultData.identifies) {
      Object.assign(o, {
        [i.system.split("/").pop()]: i.value,
      });
    }
    return o;
  }, [defaultData]);

  return (
    <Stack>
      <TextInput
        {...form.getInputProps("nik")}
        label="NIK"
        placeholder="Masukan NIK"
        defaultValue={identifies.nik}
      />
      <TextInput
        {...form.getInputProps("fullName")}
        label="Nama"
        placeholder="Masukan nama"
        defaultValue={defaultData?.fullName}
      />
      <SelectGender
        {...form.getInputProps("gender")}
        defaultValue={defaultData?.gender}
      />
      <DateInput
        {...form.getInputProps("birthDate")}
        label="Tanggal Hahir"
        placeholder="Pilih tanggal lahir"
        defaultValue={defaultData && new Date(defaultData.birthDate)}
      />
      <TextInput
        {...form.getInputProps("phoneNumber")}
        defaultValue={defaultData?.phoneNumber}
        label="No Telp / HP"
        placeholder="Masukan no telp/hp"
      />
      <AddressPicker
        onChange={(val) => {
          console.log(val);
          form.setFieldValue("address", val as AddressInput);
        }}
        defaultValues={
          defaultData
            ? {
                name: "",
                rt: defaultData?.address?.rt,
                rw: defaultData?.address?.rw,
                no: defaultData?.address?.no,
                block: defaultData?.address?.block,
                floor: defaultData?.address?.floor,
                address: defaultData?.address?.address,
                villageId: defaultData?.address?.subdistrictId,
                districtId: defaultData?.address?.subdistrict?.districtId,
                regencyId:
                  defaultData?.address?.subdistrict?.district?.regencyId,
                provinceId:
                  defaultData?.address?.subdistrict?.district?.regency
                    ?.provinceId,
              }
            : undefined
        }
      />
    </Stack>
  );
};
