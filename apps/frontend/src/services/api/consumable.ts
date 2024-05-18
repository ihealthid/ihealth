import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { Brand } from "./brand";
import { FormType } from "./form-type";
import { PaginationResult } from "@/types/pagination-result";

export type Consumable = {
  id: number;
  name: string;
  price: number;
  variant?: string;
  formTypeId: number;
  brandId: number;
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
  formTypeId: number;
  brandId: number;
  isDomestic: boolean;
  barcode?: string;
  registeredId?: string;
};

const consumableApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getConsumables: builder.query<
      PaginationResult<Consumable>,
      PaginationQueryParams
    >({
      query: () => ({
        url: "/consumables",
      }),
      providesTags: ["Consumable"],
    }),
    createConsumable: builder.mutation<unknown, ConsumableInput>({
      query: (body) => ({
        url: "/consumables",
        method: "post",
        body,
      }),
      invalidatesTags: ["Consumable"],
    }),
    deleteConsumable: builder.mutation<unknown, number>({
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
  useCreateConsumableMutation,
  useDeleteConsumableMutation,
} = consumableApi;
