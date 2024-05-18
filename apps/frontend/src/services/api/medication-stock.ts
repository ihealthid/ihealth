import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { Medication } from "./medication";
import { EntityResponse } from "@/types/entity-response";

export interface MedicationStock {
  id: number;
  quantity: number;
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
  medicationId: number;
  medication: Medication;
}

interface MedicationStockInput {
  quantity: number;
  medicationId: number;
  expiredAt: string;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getMedicationStocks: query<
      PaginationResult<MedicationStock>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/medication-stocks",
        params,
      }),
      providesTags: ["MedicationStock"],
    }),

    createMedicationStock: mutation<
      EntityResponse<MedicationStock>,
      MedicationStockInput
    >({
      query: (body) => ({
        url: "/medication-stocks",
        method: "post",
        body,
      }),
      invalidatesTags: ["MedicationStock", "Medication"],
    }),
  }),
});

export const { useGetMedicationStocksQuery, useCreateMedicationStockMutation } =
  api;
