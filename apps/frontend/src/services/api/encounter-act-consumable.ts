import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { Consumable } from "./consumable";
import { EncounterAct } from "./encounter-act";

export interface EncounterActConsumable {
  id: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  consumableId: string;
  consumable: Consumable;
  encounterActId: string;
  encounterAct: EncounterAct;
}

interface EncounterActConsumableInput {
  quantity: number;
  consumableId: string;
  encounterActId: string;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getEncounterActConsumables: query<
      PaginationResult<EncounterActConsumable>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/encounter-act-consumables",
        params,
      }),
      providesTags: ["EncounterActConsumable"],
    }),

    createEncounterActConsumable: mutation<
      unknown,
      EncounterActConsumableInput
    >({
      query: (body) => ({
        url: "/encounter-act-consumables",
        method: "post",
        body,
      }),
      invalidatesTags: ["EncounterActConsumable"],
    }),
  }),
});

export const {
  useGetEncounterActConsumablesQuery,
  useCreateEncounterActConsumableMutation,
} = api;
