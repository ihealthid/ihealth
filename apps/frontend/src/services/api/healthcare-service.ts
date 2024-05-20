import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { EntityResponse } from "@/types/entity-response";

export interface HealthcareService {
  id: string;
  name: string;
  price: number;
}

interface HealthcareServiceInput {
  name: string;
  price: number;
}

const api = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getHealthcareService: builder.query<
      EntityResponse<HealthcareService>,
      string
    >({
      query: (id) => ({
        url: "/healthcare-services/" + id,
      }),
      providesTags: ["HealthcareService"],
    }),
    getHealthcareServices: builder.query<
      PaginationResult<HealthcareService>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/healthcare-services",
        params,
      }),
      providesTags: ["HealthcareService"],
    }),
    createHealthcareService: builder.mutation<unknown, HealthcareServiceInput>({
      query: (body) => ({
        url: "/healthcare-services",
        method: "post",
        body,
      }),
      invalidatesTags: ["HealthcareService"],
    }),
    updateHealthcareService: builder.mutation<
      EntityResponse<HealthcareService>,
      HealthcareServiceInput & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: "/healthcare-services/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["HealthcareService"],
    }),
    deleteHealthcareService: builder.mutation<
      EntityResponse<HealthcareService>,
      string
    >({
      query: (id) => ({
        url: `/healthcare-services/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["HealthcareService"],
    }),
  }),
});

export const {
  useGetHealthcareServicesQuery,
  useLazyGetHealthcareServiceQuery,
  useCreateHealthcareServiceMutation,
  useUpdateHealthcareServiceMutation,
  useDeleteHealthcareServiceMutation,
} = api;
