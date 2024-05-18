import { PaginationQueryParams } from "@/types/pagination-query-params";
import { Village } from "./area";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { EntityResponse } from "@/types/entity-response";

export type Address = {
  id: number;
  name: string;
  address: string;
  village: Village;
  entry: { code: string; value: string }[];
};

export type Identify = {
  system: string;
  value: string;
};

export type Patient = {
  id: number;
  identifies: Identify[];
  fullName: string;
  gender: string;
  birthDate: string;
  addresses: Address[];
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
};

const patientApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatient: builder.query<EntityResponse<Patient>, number>({
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
      { encounterId: number }
    >({
      query: ({ encounterId }) => ({
        url: `/patients/encounter/${encounterId}`,
      }),
      providesTags: ["Patient"],
    }),
    postPatient: builder.mutation<unknown, PostPatientInput>({
      query: (body) => ({
        url: "/patients",
        method: "post",
        body,
      }),
      invalidatesTags: ["Patient"],
    }),
    putPatient: builder.mutation<
      unknown,
      Partial<PostPatientInput> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: "/patients/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["Patient"],
    }),
    deletePatient: builder.mutation<unknown, number>({
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
  usePostPatientMutation,
  useDeletePatientMutation,
  useLazyGetPatientQuery,
  usePutPatientMutation,
} = patientApi;
