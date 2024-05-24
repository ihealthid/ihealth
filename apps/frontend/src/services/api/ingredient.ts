import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { EntityResponse } from "@/types/entity-response";

export interface Ingredient {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface IngredientInput {
  name: string;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getIngredients: query<PaginationResult<Ingredient>, PaginationQueryParams>({
      query: (params) => ({
        url: "/ingredients",
        params,
      }),
      providesTags: ["Ingredient"],
    }),

    getIngredient: query<EntityResponse<Ingredient>, string>({
      query: (id) => ({
        url: "/ingredients/" + id,
      }),
      providesTags: ["Ingredient"],
    }),

    createIngredient: mutation<EntityResponse<Ingredient>, IngredientInput>({
      query: (body) => ({
        url: "/ingredients",
        method: "post",
        body,
      }),
      invalidatesTags: ["Ingredient"],
    }),

    updateIngredient: mutation<
      EntityResponse<Ingredient>,
      Partial<IngredientInput> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: "/ingredients/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["Ingredient"],
    }),

    deleteIngredient: mutation<EntityResponse<Ingredient>, string>({
      query: (id) => ({
        url: "/ingredients/" + id,
        method: "delete",
      }),
      invalidatesTags: ["Ingredient"],
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useLazyGetIngredientQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
} = api;
