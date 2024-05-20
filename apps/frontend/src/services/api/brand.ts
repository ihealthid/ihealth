import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { EntityResponse } from "@/types/entity-response";
import { Manufacture } from "./manufacture";

export interface Brand {
  id: string;
  name: string;
  manufactureId: string;
  manufacture: Manufacture;
  createdAt: string;
  updatedAt: string;
}

interface BrandInput {
  name: string;
  manufactureId: string;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getBrands: query<PaginationResult<Brand>, PaginationQueryParams>({
      query: (params) => ({
        url: "/brands",
        params,
      }),
      providesTags: ["Brand"],
    }),

    getBrand: query<EntityResponse<Brand>, string>({
      query: (id) => ({
        url: "/brands/" + id,
      }),
      providesTags: ["Brand"],
    }),

    createBrand: mutation<EntityResponse<Brand>, BrandInput>({
      query: (body) => ({
        url: "/brands",
        method: "post",
        body,
      }),
      invalidatesTags: ["Brand"],
    }),

    updateBrand: mutation<
      EntityResponse<Brand>,
      Partial<BrandInput> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: "/brands/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["Brand"],
    }),

    deleteBrand: mutation<EntityResponse<Brand>, string>({
      query: (id) => ({
        url: "/brands/" + id,
        method: "delete",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useLazyGetBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = api;
