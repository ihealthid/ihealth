import { Observation } from "./observation";
import { HealthcareService } from "./healthcare-service";
import { Patient } from "./patient";
import { Diagnose } from "./diagnose";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { DateValue } from "@mantine/dates";
import { EncounterStatus } from "./encounter-status";

export type Encounter = {
  id: number;
  patient: Patient;
  screening: Observation;
  diagnose?: Diagnose;
  clinicService: HealthcareService;
  createdAt: string;
  updatedAt: string;
  status: EncounterStatus;
  histories: any[]
};

type PostEncounterInput = {
  patientId: number;
  clinicServiceId: number;
  visualScreeningId: number;
};

const encounterApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getEncounter: builder.query<Encounter, number>({
      query: (id) => ({
        url: `/encounters/${id}`,
      }),
      providesTags: ["Encounter"],
    }),
    getEncounters: builder.query<
      PaginationResult<Encounter>,
      PaginationQueryParams & {
        status?: string[];
        date?: DateValue;
      }
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
  useGetEncountersQuery,
  usePostEncounterMutation,
} = encounterApi;
