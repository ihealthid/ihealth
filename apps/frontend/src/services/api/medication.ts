import { PaginationQueryParams } from "@/types/pagination-query-params";
import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { EntityResponse } from "@/types/entity-response";
import { DoseForm } from "./dose-form";

export type Medication = {
  id: number;
  bpom: string;
  name: string;
  price: number;
  quantity: number;
  doseFormId: number;
  doseForm: DoseForm;
  createdAt: string;
  updatedAt: string;
};

export type MedicationBatch = {
  id: number;
  quantity: number;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  expiredAt: string;
};

type PostMedicationInput = {
  bpom: string;
  name: string;
  price: number;
};

type GetMedicationStockResult = {
  data: {
    all: number;
    good: number;
    beforeExpires: number;
    expired: number;
  };
};

const medicationApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getMedication: builder.query<EntityResponse<Medication>, number>({
      query: (id) => ({
        url: "/medications/" + id,
      }),
      providesTags: ["Medication"],
    }),
    getMedications: builder.query<
      PaginationResult<Medication>,
      PaginationQueryParams
    >({
      query: () => ({
        url: "/medications",
      }),
      providesTags: ["Medication"],
    }),
    getMedicationStockCount: builder.query<
      GetMedicationStockResult,
      PaginationQueryParams & { medicationId: number }
    >({
      query: ({ medicationId, ...params }) => ({
        url: `/medications/${medicationId}/count`,
        params,
      }),
      providesTags: ["MedicationStock"],
    }),
    postMedication: builder.mutation<unknown, PostMedicationInput>({
      query: (body) => ({
        url: "/medications",
        method: "post",
        body,
      }),
      invalidatesTags: ["Medication"],
    }),
    putMedication: builder.mutation<
      unknown,
      Partial<PostMedicationInput> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: "/medications/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["Medication"],
    }),
    deleteMedication: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/medications/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Medication"],
    }),
  }),
});

export const {
  useGetMedicationsQuery,
  useGetMedicationStockCountQuery,
  usePostMedicationMutation,
  useDeleteMedicationMutation,
  useLazyGetMedicationQuery,
  usePutMedicationMutation,
} = medicationApi;
