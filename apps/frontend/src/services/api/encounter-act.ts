import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { EntityResponse } from "@/types/entity-response";

export interface EncounterAct {
  id: string;
  code: string;
  display: string;
  price: number;
}

interface EncounterActInput {
  code: string;
  display: string;
  price: number;
}

const api = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getEncounterAct: builder.query<EntityResponse<EncounterAct>, string>({
      query: (id) => ({
        url: "/encounter-acts/" + id,
      }),
      providesTags: ["EncounterAct"],
    }),
    getEncounterActs: builder.query<
      PaginationResult<EncounterAct>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/encounter-acts",
        params,
      }),
      providesTags: ["EncounterAct"],
    }),
    createEncounterAct: builder.mutation<
      EntityResponse<EncounterAct>,
      EncounterActInput
    >({
      query: (body) => ({
        url: "/encounter-acts",
        method: "post",
        body,
      }),
      invalidatesTags: ["EncounterAct"],
    }),
    updateEncounterAct: builder.mutation<
      EntityResponse<EncounterAct>,
      EncounterActInput & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: "/encounter-acts/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["EncounterAct"],
    }),
    deleteEncounterAct: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/encounter-acts/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["EncounterAct"],
    }),
  }),
});

export const {
  useLazyGetEncounterActQuery,
  useGetEncounterActsQuery,
  useCreateEncounterActMutation,
  useUpdateEncounterActMutation,
  useDeleteEncounterActMutation,
} = api;
