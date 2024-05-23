import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { EntityResponse } from "@/types/entity-response";

export interface Distributor {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface DistributorInput {
  name: string;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getDistributors: query<
      PaginationResult<Distributor>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/distributors",
        params,
      }),
      providesTags: ["Distributor"],
    }),

    getDistributor: query<EntityResponse<Distributor>, string>({
      query: (id) => ({
        url: "/distributors/" + id,
      }),
      providesTags: ["Distributor"],
    }),

    createDistributor: mutation<EntityResponse<Distributor>, DistributorInput>({
      query: (body) => ({
        url: "/distributors",
        method: "post",
        body,
      }),
      invalidatesTags: ["Distributor"],
    }),

    updateDistributor: mutation<
      EntityResponse<Distributor>,
      Partial<DistributorInput> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: "/distributors/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["Distributor"],
    }),

    deleteDistributor: mutation<EntityResponse<Distributor>, string>({
      query: (id) => ({
        url: "/distributors/" + id,
        method: "delete",
      }),
      invalidatesTags: ["Distributor"],
    }),
  }),
});

export const {
  useGetDistributorsQuery,
  useLazyGetDistributorQuery,
  useCreateDistributorMutation,
  useUpdateDistributorMutation,
  useDeleteDistributorMutation,
} = api;
