import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { EntityResponse } from "@/types/entity-response";
import { Distributor } from "./distributor";
import { Payment } from "./payment";

export interface Procurement {
  id: string;
  createdAt: string;
  updatedAt: string;
  distributorId?: string;
  distributor: Distributor;
  paymentId: string;
  payment: Payment;
}

interface ProcurementItemInput {
  medicationId: string;
  quantity: number;
  price: number;
  discount?: number;
  expiredAt: string;
  unit: string;
}

interface ProcurementInput {
  distributorId?: string;
  isCredit?: boolean;
  items: ProcurementItemInput[];
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getProcurements: query<
      PaginationResult<Procurement>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/procurements",
        params,
      }),
      providesTags: ["Procurement"],
    }),

    getProcurement: query<EntityResponse<Procurement>, string>({
      query: (id) => ({
        url: "/procurements/" + id,
      }),
      providesTags: ["Procurement"],
    }),

    createProcurement: mutation<EntityResponse<Procurement>, ProcurementInput>({
      query: (body) => ({
        url: "/procurements",
        method: "post",
        body,
      }),
      invalidatesTags: ["Procurement"],
    }),

    updateProcurement: mutation<
      EntityResponse<Procurement>,
      Partial<ProcurementInput> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: "/procurements/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["Procurement"],
    }),

    deleteProcurement: mutation<EntityResponse<Procurement>, string>({
      query: (id) => ({
        url: "/procurements/" + id,
        method: "delete",
      }),
      invalidatesTags: ["Procurement"],
    }),
  }),
});

export const {
  useGetProcurementsQuery,
  useLazyGetProcurementQuery,
  useCreateProcurementMutation,
  useUpdateProcurementMutation,
  useDeleteProcurementMutation,
} = api;
