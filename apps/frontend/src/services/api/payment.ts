import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { Encounter } from "./encounter";
import { EntityResponse } from "@/types/entity-response";

export interface PaymentStatus {
  id: number;
  code: string;
  display: string;
  order: number;
}

export interface Payment {
  id: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
  statusId: number;
  status: PaymentStatus;
  encounterId?: number;
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
    }),

    getPayment: query<EntityResponse<PaymentDetail>, number>({
      query: (id) => ({
        url: "/payments/" + id,
      }),
    }),

    donePayment: mutation<EntityResponse<Payment>, number>({
      query: (id) => ({
        url: "/payments",
        method: "post",
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useDonePaymentMutation,
} = api;
