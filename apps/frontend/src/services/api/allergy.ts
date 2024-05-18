import { mainApi } from "./main";

export type Allergy = {
  id: string;
  name: string;
  description?: string;
};

type PatientAllergy = {
  id: number;
  severity: number;
  allergy: Allergy;
  createdAt: string;
  updatedAt: string;
};

type PostPatientAllergyInput = {
  encounterId: number;
  name: string;
  level: number;
};

type GetPatientAllergyResult = {
  data: PatientAllergy[];
};

const allergyApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    postPatientAllergy: builder.mutation<unknown, PostPatientAllergyInput>({
      query: (body) => ({
        url: `/patient-allergies/encounter`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Allergy"],
    }),
    getPatientAllergy: builder.query<
      GetPatientAllergyResult,
      { encounterId: number }
    >({
      query: ({ encounterId }) => ({
        url: "/patient-allergies/encounter/" + encounterId,
      }),
      providesTags: ["PatientAllergy"],
    }),
  }),
});

export const { usePostPatientAllergyMutation, useGetPatientAllergyQuery } =
  allergyApi;
