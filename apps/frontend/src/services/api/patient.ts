import { PaginationQueryParams } from "@/types/pagination-query-params";
import { Village } from "./area";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { EntityResponse } from "@/types/entity-response";

export type Address = {
  id: string;
  name: string;
  address: string;
  village: Village;
  entries: { code: string; value: string }[];
};

export type Identify = {
  system: string;
  value: string;
};

export type Patient = {
  id: string;
  identifies: Identify[];
  fullName: string;
  gender: string;
  birthDate: string;
  addresses: Address[];
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
};

export type AddressInput = {
  name: string | null;
  rt: string | null;
  rw: string | null;
  block: string | null;
  no: string | null;
  floor: string | null;
  address: string | null;
  provinceId: string | null;
  regencyId: string | null;
  districtId: string | null;
  villageId: string | null;
};

type PostPatientInput = {
  nik: string;
  fullName: string;
  gender: string;
  birthDate: string;
  address: AddressInput;
  phoneNumber: string | null;
};

const patientApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.query<EntityResponse<Patient>, string>({
      query: (id) => ({
        url: "/patients/" + id,
      }),
      providesTags: ["Patient"],
    }),
    getPatients: builder.query<
      PaginationResult<Patient>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/patients",
        params,
      }),
      providesTags: ["Patient"],
    }),
    getPatientByEncounterId: builder.query<
      { data: Patient },
      { encounterId: string }
    >({
      query: ({ encounterId }) => ({
        url: `/patients/encounter/${encounterId}`,
      }),
      providesTags: ["Patient"],
    }),
    createPatient: builder.mutation<EntityResponse<Patient>, PostPatientInput>({
      query: (body) => ({
        url: "/patients",
        method: "post",
        body,
      }),
      invalidatesTags: ["Patient"],
    }),
    updatePatient: builder.mutation<
      EntityResponse<Patient>,
      Partial<PostPatientInput> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: "/patients/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["Patient"],
    }),
    deletePatient: builder.mutation<EntityResponse<Patient>, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Patient"],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientByEncounterIdQuery,
  useLazyGetPatientsQuery,
  useCreatePatientMutation,
  useDeletePatientMutation,
  useLazyGetPatientQuery,
  useUpdatePatientMutation,
} = patientApi;
