import { PaginationQueryParams } from "@/types/pagination-query-params";
import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { EntityResponse } from "@/types/entity-response";
import { DoseForm } from "./dose-form";
import { MedicationIngredient } from "./medication-ingredient";

export type Medication = {
  id: string;
  bpom: string;
  name: string;
  price: number;
  quantity: number;
  doseFormId: string;
  doseForm: DoseForm;
  stock: string;
  createdAt: string;
  updatedAt: string;
  ingredients: MedicationIngredient[]
};

export type MedicationBatch = {
  id: string;
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
    getMedication: builder.query<EntityResponse<Medication>, string>({
      query: (id) => ({
        url: "/medications/" + id,
      }),
      providesTags: ["Medication"],
    }),
    getMedications: builder.query<
      PaginationResult<Medication>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/medications",
        params,
      }),
      providesTags: ["Medication"],
    }),
    getMedicationStockCount: builder.query<
      GetMedicationStockResult,
      PaginationQueryParams & { medicationId: string }
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
      Partial<PostMedicationInput> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: "/medications/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["Medication"],
    }),
    deleteMedication: builder.mutation<unknown, string>({
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
