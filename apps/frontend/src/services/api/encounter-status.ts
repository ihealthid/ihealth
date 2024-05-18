import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { EntityResponse } from "@/types/entity-response";

export type EncounterStatus = {
  id: number;
  display: string;
};

interface EncounterStatusInput {
  code: string;
  display: string;
  definition?: string;
}

const encounterStatusApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getEncounterStatuses: builder.query<
      PaginationResult<EncounterStatus>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: `/encounter-statuses`,
        params,
      }),
      providesTags: ["EncounterStatus"],
    }),

    getEncounterStatus: builder.query<EntityResponse<EncounterStatus>, number>({
      query: (id) => ({
        url: `/encounter-statuses/` + id,
      }),
      providesTags: ["EncounterStatus"],
    }),

    createEncounterStatus: builder.mutation<unknown, EncounterStatusInput>({
      query: (body) => ({
        url: "/encounter-statuses",
        method: "post",
        body,
      }),
      invalidatesTags: ["EncounterStatus"],
    }),

    updateEncounterStatus: builder.mutation<
      unknown,
      Partial<EncounterStatusInput> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: "/encounter-statuses/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["EncounterStatus"],
    }),

    deleteEncounterStatus: builder.mutation<unknown, number>({
      query: (id) => ({
        url: "/encounter-statuses/" + id,
        method: "delete",
      }),
      invalidatesTags: ["EncounterStatus"],
    }),
  }),
});

export const {
  useGetEncounterStatusesQuery,
  useLazyGetEncounterStatusQuery,
  useCreateEncounterStatusMutation,
  useUpdateEncounterStatusMutation,
  useDeleteEncounterStatusMutation,
} = encounterStatusApi;
