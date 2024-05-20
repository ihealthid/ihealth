import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { Encounter } from "./encounter";
import { EntityResponse } from "@/types/entity-response";

export interface PaymentStatus {
  id: string;
  code: string;
  display: string;
  order: number;
}

export interface Payment {
  id: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  statusId: string;
  status: PaymentStatus;
  encounterId?: string;
  encounter?: Encounter;
}

interface PaymentDetail {
  paymentItems: {
    name: string;
    subtotal: number;
  }[];
  subtotal: number;
  discount: number;
  total: number;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getPayments: query<PaginationResult<Payment>, PaginationQueryParams>({
      query: (params) => ({
        url: "/payments",
        params,
      }),
      providesTags: ["Payment"],
    }),

    getPayment: query<EntityResponse<PaymentDetail>, string>({
      query: (id) => ({
        url: "/payments/" + id,
      }),
      providesTags: ["Payment"],
    }),

    donePayment: mutation<EntityResponse<Payment>, string>({
      query: (id) => ({
        url: "/payments",
        method: "post",
        body: { id },
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useDonePaymentMutation,
} = api;
