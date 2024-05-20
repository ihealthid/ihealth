import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";

export type Allergy = {
  id: string;
  name: string;
  description?: string;
};

type PatientAllergy = {
  id: string;
  severity: number;
  allergy: Allergy;
  createdAt: string;
  updatedAt: string;
};

type PostPatientAllergyInput = {
  encounterId: string;
  name: string;
  level: number;
};

type GetPatientAllergyResult = {
  data: PatientAllergy[];
};

const allergyApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createPatientAllergy: builder.mutation<unknown, PostPatientAllergyInput>({
      query: (body) => ({
        url: `/patient-allergies`,
        method: "post",
        body,
      }),
      invalidatesTags: ["PatientAllergy"],
    }),
    getPatientAllergy: builder.query<
      GetPatientAllergyResult,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/patient-allergies",
        params,
      }),
      providesTags: ["PatientAllergy"],
    }),
  }),
});

export const { useCreatePatientAllergyMutation, useGetPatientAllergyQuery } =
  allergyApi;
