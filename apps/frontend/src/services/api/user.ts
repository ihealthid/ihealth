import { Role } from "./role";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { PaginationQueryParams } from "@/types/pagination-query-params";

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
  endpoints: (builder) => ({
    getUsers: builder.query<PaginationResult<User>, PaginationQueryParams>({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["User"],
    }),
    postUser: builder.mutation<unknown, PostUserInput>({
      query: (body) => ({
        url: "/users",
        method: "post",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation, usePostUserMutation } =
  userApi;
