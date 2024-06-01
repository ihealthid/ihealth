import { Observation } from "./observation";
import { HealthcareService } from "./healthcare-service";
import { Patient } from "./patient";
import { Diagnose } from "./diagnose";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { EncounterStatus } from "./encounter-status";
import { PaginationQueryParams } from "@/types/pagination-query-params";

export type Encounter = {
  id: string;
  patient: Patient;
  screening: Observation;
  diagnose?: Diagnose;
  healthcareService: HealthcareService;
  createdAt: string;
  updatedAt: string;
  status: EncounterStatus;
  histories: any[];
};

type PostEncounterInput = {
  patientId: string;
  healthcareServiceId: string;
  patientConditionId: string;
};

const encounterApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getEncounter: builder.query<Encounter, string>({
      query: (id) => ({
        url: `/encounters/${id}`,
      }),
      providesTags: ["Encounter"],
    }),
    getEncounters: builder.query<
      PaginationResult<Encounter>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/encounters",
        params,
      }),
      providesTags: ["Encounter"],
    }),
    postEncounter: builder.mutation<unknown, PostEncounterInput>({
      query: (body) => ({
        url: "/encounters",
        method: "post",
        body,
      }),
      invalidatesTags: ["Encounter"],
    }),
  }),
});

export const {
  useGetEncounterQuery,
  useLazyGetEncounterQuery,
  useGetEncountersQuery,
  usePostEncounterMutation,
} = encounterApi;
