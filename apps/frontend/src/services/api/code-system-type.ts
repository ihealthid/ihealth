import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { EntityResponse } from "@/types/entity-response";

export interface CodeSystemType {
  id: number;
  name: string;
  definition?: string;
}

interface CodeSystemTypeInput extends Omit<CodeSystemType, "id"> {}

const codeSystemTypeApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCodeSystemType: builder.query<EntityResponse<CodeSystemType>, number>({
      query: (id) => ({
        url: "/code-system-types/" + id,
      }),
      providesTags: ["CodeSystemType"],
    }),
    getCodeSystemTypes: builder.query<
      PaginationResult<CodeSystemType>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/code-system-types",
        params,
      }),
      providesTags: ["CodeSystemType"],
    }),
    createCodeSystemType: builder.mutation<unknown, CodeSystemTypeInput>({
      query: (body) => ({
        url: "/code-system-types",
        method: "post",
        body,
      }),
      invalidatesTags: ["CodeSystemType"],
    }),
    updateCodeSystemType: builder.mutation<
      unknown,
      Partial<CodeSystemTypeInput> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: "/code-system-types/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["CodeSystemType"],
    }),
    deleteCodeSystemType: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/code-system-types/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["CodeSystemType"],
    }),
  }),
});

export const {
  useLazyGetCodeSystemTypeQuery,
  useGetCodeSystemTypesQuery,
  useCreateCodeSystemTypeMutation,
  useUpdateCodeSystemTypeMutation,
  useDeleteCodeSystemTypeMutation,
} = codeSystemTypeApi;
