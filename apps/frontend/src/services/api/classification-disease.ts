import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";

export type ClassificationDisease = {
  id: string;
  display: string;
  definition?: string;
};

export type ClassificationDiseaseGroup = {
  id: string;
  display: string;
  definition?: string;
  children: ClassificationDisease[];
};

const classificationDiseaseApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassificationDiseases: builder.query<
      PaginationResult<ClassificationDisease>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/classification-diseases",
        params,
      }),
      providesTags: ["ClassificationDisease"],
    }),
    getClassificationDiseaseGroup: builder.query<
      PaginationResult<ClassificationDiseaseGroup>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/classification-diseases",
        params,
      }),
      providesTags: ["ClassificationDisease"],
    }),
    postImportClassificationDisease: builder.mutation<unknown, { file: File }>({
      query: ({ file }) => {
        const body = new FormData();
        body.append("file", file);

        return {
          url: `/classification-diseases/import/xml`,
          method: "post",
          body,
        };
      },
      invalidatesTags: ["ClassificationDisease"],
    }),
  }),
});

export const {
  usePostImportClassificationDiseaseMutation,
  useGetClassificationDiseasesQuery,
  useGetClassificationDiseaseGroupQuery,
  useLazyGetClassificationDiseaseGroupQuery,
} = classificationDiseaseApi;
