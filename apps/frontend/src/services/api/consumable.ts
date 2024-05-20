import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { Brand } from "./brand";
import { FormType } from "./form-type";
import { PaginationResult } from "@/types/pagination-result";
import { EntityResponse } from "@/types/entity-response";

export type Consumable = {
  id: string;
  name: string;
  price: number;
  variant?: string;
  formTypeId: string;
  brandId: string;
  isDomestic: boolean;
  barcode?: string;
  registeredId?: string;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
  formType: FormType;
};

type ConsumableInput = {
  name: string;
  price: number;
  variant?: string;
  formTypeId: string;
  brandId: string;
  isDomestic: boolean;
  barcode?: string;
  registeredId?: string;
};

const consumableApi = mainApi.injectEndpoints({
  endpoints: ({ mutation, query }) => ({
    getConsumables: query<PaginationResult<Consumable>, PaginationQueryParams>({
      query: () => ({
        url: "/consumables",
      }),
      providesTags: ["Consumable"],
    }),
    getConsumable: query<EntityResponse<Consumable>, string>({
      query: (id) => ({
        url: `/consumables/${id}`,
      }),
      providesTags: ["Consumable"],
    }),
    createConsumable: mutation<EntityResponse<Consumable>, ConsumableInput>({
      query: (body) => ({
        url: "/consumables",
        method: "post",
        body,
      }),
      invalidatesTags: ["Consumable"],
    }),
    updateConsumable: mutation<
      EntityResponse<Consumable>,
      Partial<ConsumableInput> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/consumables/${id}`,
        method: "put",
        body,
      }),
    }),
    deleteConsumable: mutation<EntityResponse<Consumable>, string>({
      query: (id) => ({
        url: `/consumables/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Consumable"],
    }),
  }),
});

export const {
  useGetConsumablesQuery,
  useLazyGetConsumableQuery,
  useCreateConsumableMutation,
  useUpdateConsumableMutation,
  useDeleteConsumableMutation,
} = consumableApi;
