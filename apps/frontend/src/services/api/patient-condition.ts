import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { EntityResponse } from "@/types/entity-response";

export type PatientCondition = {
  id: number;
  code: string;
  display: string;
  definition?: string;
};

type PatientConditionInput = {
  code: string;
  display: string;
  definition?: string;
};

const api = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatientCondition: builder.query<
      EntityResponse<PatientCondition>,
      number
    >({
      query: (id) => ({
        url: "/patient-conditions/" + id,
      }),
      providesTags: ["PatientCondition"],
    }),
    getPatientConditions: builder.query<
      PaginationResult<PatientCondition>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/patient-conditions",
        params,
      }),
      providesTags: ["PatientCondition"],
    }),
    createPatientCondition: builder.mutation<unknown, PatientConditionInput>({
      query: (body) => ({
        url: "/patient-conditions",
        method: "post",
        body,
      }),
      invalidatesTags: ["PatientCondition"],
    }),
    updatePatientCondition: builder.mutation<
      unknown,
      PatientConditionInput & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: "/patient-conditions/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["PatientCondition"],
    }),
    deletePatientCondition: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/patient-conditions/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["PatientCondition"],
    }),
  }),
});

export const {
  useGetPatientConditionsQuery,
  useLazyGetPatientConditionQuery,
  useCreatePatientConditionMutation,
  useUpdatePatientConditionMutation,
  useDeletePatientConditionMutation,
} = api;
