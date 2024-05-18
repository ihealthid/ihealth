import { mainApi } from "./main";

export type RoleType = string;

type GetRoleTypesResult = {
  data: RoleType[];
};

const roleTypeApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoleTypes: builder.query<GetRoleTypesResult, void>({
      query: () => ({
        url: "/role-types",
      }),
      providesTags: ["RoleType"],
    }),
  }),
});

export const { useGetRoleTypesQuery } = roleTypeApi;
