import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";

export interface FormType {
  id: string;
  code: string;
  display: string;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query }) => ({
    getFormTypes: query<PaginationResult<FormType>, PaginationQueryParams>({
      query: (params) => ({
        url: "/form-types",
        params,
      }),
      providesTags: ["FormType"],
    }),
  }),
});

export const { useGetFormTypesQuery } = api;
