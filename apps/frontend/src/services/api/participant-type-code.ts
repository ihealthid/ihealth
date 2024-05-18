import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { EntityResponse } from "@/types/entity-response";

export interface ParticipantTypeCode {
  id: number;
  system: string;
  code: string;
  display: string;
  definition?: string;
  status: string;
  parentId?: number;
  parent?: ParticipantTypeCode;
}

interface ActEncounterCodeInput
  extends Omit<ParticipantTypeCode, "id" | "parent"> {}

const api = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipantTypeCode: builder.query<
      EntityResponse<ParticipantTypeCode>,
      number
    >({
      query: (id) => ({
        url: "/participant-type-codes/" + id,
      }),
      providesTags: ["ParticipantTypeCode"],
    }),
    getParticipantTypeCodes: builder.query<
      PaginationResult<ParticipantTypeCode>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/participant-type-codes",
        params,
      }),
      providesTags: ["ParticipantTypeCode"],
    }),
    createParticipantTypeCode: builder.mutation<unknown, ActEncounterCodeInput>(
      {
        query: (body) => ({
          url: "/participant-type-codes",
          method: "post",
          body,
        }),
        invalidatesTags: ["ParticipantTypeCode"],
      }
    ),
    updateParticipantTypeCode: builder.mutation<
      unknown,
      Partial<ActEncounterCodeInput> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: "/participant-type-codes/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["ParticipantTypeCode"],
    }),
    deleteParticipantTypeCode: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/participant-type-codes/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["ParticipantTypeCode"],
    }),
  }),
});

export const {
  useLazyGetParticipantTypeCodeQuery,
  useGetParticipantTypeCodesQuery,
  useCreateParticipantTypeCodeMutation,
  useUpdateParticipantTypeCodeMutation,
  useDeleteParticipantTypeCodeMutation,
} = api;
