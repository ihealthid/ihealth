import { EntityResponse } from "@/types/entity-response";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";

export type Role = {
  id: string;
  name: string;
  type: string;
};

type PostRoleInput = {
  name: string;
  type: string;
};

const roleApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getRole: builder.query<EntityResponse<Role>, number>({
      query: (id) => ({
        url: "/roles/" + id,
      }),
      providesTags: ["Role"],
    }),
    getRoles: builder.query<PaginationResult<Role>, void>({
      query: () => ({
        url: "/roles",
      }),
      providesTags: ["Role"],
    }),
    postRole: builder.mutation<unknown, PostRoleInput>({
      query: (body) => ({
        url: "/roles",
        method: "post",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    putRole: builder.mutation<unknown, PostRoleInput & { id: number }>({
      query: ({ id, ...body }) => ({
        url: "/roles/" + id,
        method: "put",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    deleteRole: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Role"],
    }),
  }),
});

export const {
  useGetRoleQuery,
  useLazyGetRoleQuery,
  useGetRolesQuery,
  useDeleteRoleMutation,
  usePostRoleMutation,
  usePutRoleMutation,
} = roleApi;
