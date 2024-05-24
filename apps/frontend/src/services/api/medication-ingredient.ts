import { PaginationResult } from "@/types/pagination-result";
import { mainApi } from "./main";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { EntityResponse } from "@/types/entity-response";
import { Medication } from "./medication";
import { Ingredient } from "./ingredient";

export interface MedicationIngredient {
  id: string;
  quantity: number;
  unit: string;
  medicationId: string;
  medication: Medication;
  ingredientId: string;
  ingredient: Ingredient;
  createdAt: string;
  updatedAt: string;
}

interface MedicationIngredientInput {
  quantity: number;
  medicationId: string;
  ingredientId: string;
  unit: string;
}

const api = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getMedicationIngredients: query<
      PaginationResult<MedicationIngredient>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/medication-ingredients",
        params,
      }),
      providesTags: ["MedicationIngredient"],
    }),

    getMedicationIngredient: query<
      EntityResponse<MedicationIngredient>,
      string
    >({
      query: (id) => ({
        url: "/medication-ingredients/" + id,
      }),
      providesTags: ["MedicationIngredient"],
    }),

    createMedicationIngredient: mutation<
      EntityResponse<MedicationIngredient>,
      MedicationIngredientInput
    >({
      query: (body) => ({
        url: "/medication-ingredients",
        method: "post",
        body,
      }),
      invalidatesTags: ["MedicationIngredient"],
    }),

    updateMedicationIngredient: mutation<
      EntityResponse<MedicationIngredient>,
      Partial<MedicationIngredientInput> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: "/medication-ingredients/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["MedicationIngredient"],
    }),

    deleteMedicationIngredient: mutation<
      EntityResponse<MedicationIngredient>,
      string
    >({
      query: (id) => ({
        url: "/medication-ingredients/" + id,
        method: "delete",
      }),
      invalidatesTags: ["MedicationIngredient"],
    }),
  }),
});

export const {
  useLazyGetMedicationIngredientQuery,
  useGetMedicationIngredientsQuery,
  useCreateMedicationIngredientMutation,
  useUpdateMedicationIngredientMutation,
  useDeleteMedicationIngredientMutation,
} = api;
