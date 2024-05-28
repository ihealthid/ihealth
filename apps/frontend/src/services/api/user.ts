import { Role } from "./role";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { PaginationQueryParams } from "@/types/pagination-query-params";
import { EntityResponse } from "@/types/entity-response";

export type User = {
  id: string;
  fullName: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
};

type PostUserInput = {
  username: string;
  password: string;
  fullName: string;
  roles: number[];
};

const userApi = mainApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getUsers: query<PaginationResult<User>, PaginationQueryParams>({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["User"],
    }),
    getUser: query<EntityResponse<User>, string>({
      query: (id) => ({
        url: "/users/" + id,
      }),
      providesTags: ["User"],
    }),
    createUser: mutation<unknown, PostUserInput>({
      query: (body) => ({
        url: "/users",
        method: "post",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: mutation<unknown, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: mutation<unknown, Partial<PostUserInput> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "put",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
