import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { EntityResponse } from "@/types/entity-response";

export interface Manufacture {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface ManufactureInput {
  name: string;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getManufactures: query<
      PaginationResult<Manufacture>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/manufactures",
        params,
      }),
      providesTags: ["Manufacture"],
    }),

    getManufacture: query<EntityResponse<Manufacture>, number>({
      query: (id) => ({
        url: "/manufactures/" + id,
      }),
      providesTags: ["Manufacture"],
    }),

    createManufacture: mutation<EntityResponse<Manufacture>, ManufactureInput>({
      query: (body) => ({
        url: "/manufactures",
        method: "post",
        body,
      }),
      invalidatesTags: ["Manufacture"],
    }),

    updateManufacture: mutation<
      EntityResponse<Manufacture>,
      Partial<ManufactureInput> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: "/manufactures/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["Manufacture"],
    }),

    deleteManufacture: mutation<EntityResponse<Manufacture>, number>({
      query: (id) => ({
        url: "/manufactures/" + id,
        method: "delete",
      }),
      invalidatesTags: ["Manufacture"],
    }),
  }),
});

export const {
  useGetManufacturesQuery,
  useLazyGetManufactureQuery,
  useCreateManufactureMutation,
  useUpdateManufactureMutation,
  useDeleteManufactureMutation,
} = api;
