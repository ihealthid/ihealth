import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { EntityResponse } from "@/types/entity-response";

export interface ActEncounterCode {
  id: number;
  system: string;
  code: string;
  display: string;
  definition?: string;
  status: string;
  parents: ActEncounterCode[];
}

interface ActEncounterCodeInput
  extends Omit<ActEncounterCode, "id" | "parents"> {}

const api = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getActEncounterCode: builder.query<
      EntityResponse<ActEncounterCode>,
      number
    >({
      query: (id) => ({
        url: "/act-encounter-codes/" + id,
      }),
      providesTags: ["ActEncounterCode"],
    }),
    getActEncounterCodes: builder.query<
      PaginationResult<ActEncounterCode>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/act-encounter-codes",
        params,
      }),
      providesTags: ["ActEncounterCode"],
    }),
    createActEncounterCode: builder.mutation<unknown, ActEncounterCodeInput>({
      query: (body) => ({
        url: "/act-encounter-codes",
        method: "post",
        body,
      }),
      invalidatesTags: ["ActEncounterCode"],
    }),
    updateActEncounterCode: builder.mutation<
      unknown,
      Partial<ActEncounterCodeInput> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: "/act-encounter-codes/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["ActEncounterCode"],
    }),
    deleteActEncounterCode: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/act-encounter-codes/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["ActEncounterCode"],
    }),
  }),
});

export const {
  useLazyGetActEncounterCodeQuery,
  useGetActEncounterCodesQuery,
  useCreateActEncounterCodeMutation,
  useUpdateActEncounterCodeMutation,
  useDeleteActEncounterCodeMutation,
} = api;
