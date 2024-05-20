import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";

export interface DoseForm {
  id: string;
  display: string;
  definition?: string;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query }) => ({
    getDoseForms: query<PaginationResult<DoseForm>, PaginationQueryParams>({
      query: (params) => ({
        url: "/dose-forms",
        params,
      }),
    }),
  }),
});

export const { useGetDoseFormsQuery } = api;
