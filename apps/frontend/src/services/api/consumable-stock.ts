import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { EntityResponse } from "@/types/entity-response";
import { Consumable } from "./consumable";

export interface ConsumableStock {
  id: string;
  quantity: number;
  balance: number;
  price: number;
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
  returnedAt: string;
  consumableId: string;
  consumable: Consumable;
}

interface ConsumableStockInput {
  quantity: number;
  price: number;
  expiredAt: string;
  consumableId: string;
  packaging: Record<string, string | number>;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getConsumableStocks: query<
      PaginationResult<ConsumableStock>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/consumable-stocks",
        params,
      }),
      providesTags: ["ConsumableStock"],
    }),

    createConsumableStock: mutation<
      EntityResponse<ConsumableStock>,
      ConsumableStockInput
    >({
      query: (body) => ({
        url: "/consumable-stocks",
        method: "post",
        body,
      }),
      invalidatesTags: ["ConsumableStock"],
    }),

    deleteConsumableStock: mutation<EntityResponse<ConsumableStock>, string>({
      query: (id) => ({
        url: "/consumable-stocks/" + id,
        method: "delete",
      }),
      invalidatesTags: ["ConsumableStock"],
    }),
  }),
});

export const {
  useGetConsumableStocksQuery,
  useCreateConsumableStockMutation,
  useDeleteConsumableStockMutation,
} = api;
