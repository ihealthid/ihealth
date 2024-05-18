import { Medication } from "./medication";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { PaginationQueryParams } from "@/types/pagination-query-params";

export type PrescriptionItem = {
  id: number;
  medication: Medication;
  quantity: number;
  note?: string;
  doses: number;
  frequency: number;
  createdAt: string;
  updatedAt: string;
};

export type PostPrescriptionItemInput = {
  id?: number;
  encounterId?: number;
  medicationId: number;
  quantity: number;
  doses: number;
  frequency: number;
  note?: string;
};

const prescriptionItemApi = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getPrescriptionItems: query<
      PaginationResult<PrescriptionItem>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: `/prescription-items`,
        params,
      }),
      providesTags: ["PrescriptionItem"],
    }),
    createPrescriptionItem: mutation<
      PrescriptionItem,
      PostPrescriptionItemInput
    >({
      query: (body) => ({
        url: `/prescription-items`,
        method: "post",
        body,
      }),
      invalidatesTags: ["Prescription", "PrescriptionItem"],
    }),
    deletePrescriptionItem: mutation<unknown, number>({
      query: (id) => ({
        url: `/prescription-items/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Prescription", "PrescriptionItem"],
    }),
  }),
});

export const {
  useGetPrescriptionItemsQuery,
  useCreatePrescriptionItemMutation,
  useDeletePrescriptionItemMutation,
} = prescriptionItemApi;
