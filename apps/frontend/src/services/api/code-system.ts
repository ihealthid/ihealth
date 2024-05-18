import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { EntityResponse } from "@/types/entity-response";
import { CodeSystemType } from "./code-system-type";

export interface CodeSystem {
  id: number;
  code: string;
  system: string;
  display: string;
  definition?: string;
  typeId: number;
  type: CodeSystemType;
}

interface CodeSystemTypeInput extends Omit<CodeSystem, "id" | "type"> {}

const codeSystemApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCodeSystem: builder.query<EntityResponse<CodeSystem>, number>({
      query: (id) => ({
        url: "/code-systems/" + id,
      }),
      providesTags: ["CodeSystem"],
    }),
    getCodeSystems: builder.query<
      PaginationResult<CodeSystem>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/code-systems",
        params,
      }),
      providesTags: ["CodeSystem"],
    }),
    createCodeSystem: builder.mutation<unknown, CodeSystemTypeInput>({
      query: (body) => ({
        url: "/code-systems",
        method: "post",
        body,
      }),
      invalidatesTags: ["CodeSystem"],
    }),
    updateCodeSystem: builder.mutation<
      unknown,
      Partial<CodeSystemTypeInput> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: "/code-systems/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["CodeSystem"],
    }),
    deleteCodeSystem: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/code-systems/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["CodeSystem"],
    }),
  }),
});

export const {
  useLazyGetCodeSystemQuery,
  useGetCodeSystemsQuery,
  useCreateCodeSystemMutation,
  useUpdateCodeSystemMutation,
  useDeleteCodeSystemMutation,
} = codeSystemApi;
