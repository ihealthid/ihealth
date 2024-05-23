import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { Medication } from "./medication";
import { EntityResponse } from "@/types/entity-response";
import { Distributor } from "./distributor";

export interface MedicationStock {
  id: string;
  quantity: number;
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
  medicationId: string;
  medication: Medication;
  distributorId: string;
  distributor: Distributor;
}

interface MedicationStockInput {
  quantity: number;
  medicationId: string;
  distributorId: string;
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
