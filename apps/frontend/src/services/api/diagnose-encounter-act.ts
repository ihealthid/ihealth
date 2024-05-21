import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { Encounter } from "./encounter";
import { EncounterAct } from "./encounter-act";
import { User } from "./user";

export interface DiagnoseEncounterAct {
  id: string;
  createdAt: string;
  updatedAt: string;
  encounterId: string;
  encounterActId: string;
  userId: string;
  encounter: Encounter;
  encounterAct: EncounterAct;
  user: User;
}

interface DiagnoseEncounterActInput {
  userId: string;
  encounterActId: string;
  encounterId: string;
  consumableId?: string;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ mutation, query }) => ({
    getDiagnoseEncounterActs: query<
      PaginationResult<DiagnoseEncounterAct>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/diagnose-encounter-acts",
        params,
      }),
      providesTags: ["DiagnoseEncounterAct"],
    }),

    createDiagnoseEncounterAct: mutation<unknown, DiagnoseEncounterActInput>({
      query: (body) => ({
        url: "/diagnose-encounter-acts",
        method: "post",
        body,
      }),
      invalidatesTags: ["DiagnoseEncounterAct"],
    }),

    deleteDiagnoseEncounterAct: mutation<unknown, string>({
      query: (id) => ({
        url: "/diagnose-encounter-acts/" + id,
        method: "delete",
      }),
      invalidatesTags: ["DiagnoseEncounterAct"],
    }),
  }),
});

export const {
  useGetDiagnoseEncounterActsQuery,
  useDeleteDiagnoseEncounterActMutation,
  useCreateDiagnoseEncounterActMutation,
} = api;
