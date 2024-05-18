import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { EntityResponse } from "@/types/entity-response";
import { downloadFile } from "@/utils/download-file";

export type MaritalStatus = {
  id: number;
  code: string;
  system: string;
  display: string;
  level: number;
  definition?: string;
  status?: string;
};

export interface MaritalStatusInput extends Omit<MaritalStatus, "id"> {}

const maritalStatusApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getMaritalStatuses: builder.query<
      PaginationResult<MaritalStatus>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/marital-statuses",
        params,
      }),
      providesTags: ["MaritalStatus"],
    }),

    getMaritalStatus: builder.query<EntityResponse<MaritalStatus>, number>({
      query: (id) => ({
        url: "/marital-statuses/" + id,
      }),
      providesTags: ["MaritalStatus"],
    }),

    createMaritalStatus: builder.mutation<
      EntityResponse<MaritalStatus>,
      MaritalStatusInput
    >({
      query: (body) => ({
        url: "/marital-statuses",
        method: "post",
        body,
      }),
      invalidatesTags: ["MaritalStatus"],
    }),

    updateMaritalStatus: builder.mutation<
      EntityResponse<MaritalStatus>,
      Partial<MaritalStatusInput> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: "/marital-statuses/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["MaritalStatus"],
    }),

    deleteMaritalStatus: builder.mutation<
      EntityResponse<MaritalStatus>,
      number
    >({
      query: (id) => ({
        url: "/marital-statuses/" + id,
        method: "delete",
      }),
      invalidatesTags: ["MaritalStatus"],
    }),

    exportMaritalStatus: builder.query<any, void>({
      query: () => ({
        url: `/marital-statuses/export`,
        responseHandler(response) {
          return downloadFile(response);
        },
      }),
    }),

    initMaritalStatus: builder.mutation<unknown, void>({
      query: () => ({
        url: "/marital-statuses/init",
        method: "post",
      }),
      invalidatesTags: ["MaritalStatus"],
    }),
  }),
});

export const {
  useLazyGetMaritalStatusQuery,
  useGetMaritalStatusesQuery,
  useCreateMaritalStatusMutation,
  useUpdateMaritalStatusMutation,
  useDeleteMaritalStatusMutation,
  useLazyExportMaritalStatusQuery,
  useInitMaritalStatusMutation,
} = maritalStatusApi;
