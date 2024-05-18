import { PaginationQueryParams } from "@/types/pagination-query-params";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";

export type Province = {
  id: string;
  name: string;
};

export type Regency = {
  id: string;
  name: string;
  province: Province;
};

export type District = {
  id: string;
  name: string;
  regency: Regency;
};

export type Village = {
  id: string;
  name: string;
  district: District;
};

interface GetRegencyInput extends PaginationQueryParams {
  provinceId?: string | null;
}

interface GetDistrictInput extends PaginationQueryParams {
  regencyId?: string | null;
}

interface GetVillageInput extends PaginationQueryParams {
  districtId?: string | null;
}

const areaApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getProvinces: builder.query<
      PaginationResult<Province>,
      PaginationQueryParams
    >({
      query: (params) => ({
        url: "/provinces",
        params,
      }),
      providesTags: ["Province"],
    }),
    postProvince: builder.mutation<unknown, { file: File }>({
      query: ({ file }) => {
        const form = new FormData();
        form.append("file", file);
        return {
          url: "/provinces",
          method: "post",
          body: form,
        };
      },
      invalidatesTags: ["Province"],
    }),
    getRegencies: builder.query<PaginationResult<Regency>, GetRegencyInput>({
      query: (params) => ({
        url: "/regencies",
        params,
      }),
      providesTags: ["Regency"],
    }),
    postRegency: builder.mutation<unknown, { file: File }>({
      query: ({ file }) => {
        const form = new FormData();
        form.append("file", file);
        return {
          url: "/regencies",
          method: "post",
          body: form,
        };
      },
      invalidatesTags: ["Regency"],
    }),
    getDistricts: builder.query<PaginationResult<District>, GetDistrictInput>({
      query: (params) => ({
        url: "/districts",
        params,
      }),
      providesTags: ["District"],
    }),
    postDistrict: builder.mutation<unknown, { file: File }>({
      query: ({ file }) => {
        const form = new FormData();
        form.append("file", file);
        return {
          url: "/districts",
          method: "post",
          body: form,
        };
      },
      invalidatesTags: ["District"],
    }),
    getVillages: builder.query<PaginationResult<District>, GetVillageInput>({
      query: (params) => ({
        url: "/villages",
        params,
      }),
      providesTags: ["Village"],
    }),
    postVillage: builder.mutation<unknown, { file: File }>({
      query: ({ file }) => {
        const form = new FormData();
        form.append("file", file);
        return {
          url: "/villages",
          method: "post",
          body: form,
        };
      },
      invalidatesTags: ["Village"],
    }),
  }),
});

export const {
  usePostProvinceMutation,
  useGetProvincesQuery,
  usePostRegencyMutation,
  useGetRegenciesQuery,
  usePostDistrictMutation,
  useGetDistrictsQuery,
  useGetVillagesQuery,
  usePostVillageMutation,
} = areaApi;
