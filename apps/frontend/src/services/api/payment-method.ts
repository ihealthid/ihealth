import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { EntityResponse } from "@/types/entity-response";

export type PaymentMethod = {
  id: string;
  code: string;
  display: string;
};

type PaymentMethodInput = {
  code: string;
  display: string;
};

const api = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getPaymentMethod: query<EntityResponse<PaymentMethod>, string>({
      query: (id) => ({
        url: "/payment-methods/" + id,
      }),
      providesTags: ["PaymentMethod"],
    }),
    getPaymentMethods: query<
      PaginationResult<PaymentMethod>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/payment-methods",
        params,
      }),
      providesTags: ["PaymentMethod"],
    }),
    createPaymentMethod: mutation<
      EntityResponse<PaymentMethod>,
      PaymentMethodInput
    >({
      query: (body) => ({
        url: "/payment-methods",
        method: "post",
        body,
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
    updatePaymentMethod: mutation<
      EntityResponse<PaymentMethod>,
      PaymentMethodInput & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: "/payment-methods/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
    deletePaymentMethod: mutation<EntityResponse<PaymentMethod>, string>({
      query: (id) => ({
        url: `/payment-methods/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["PaymentMethod"],
    }),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useLazyGetPaymentMethodQuery,
  useCreatePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
  useDeletePaymentMethodMutation,
} = api;
