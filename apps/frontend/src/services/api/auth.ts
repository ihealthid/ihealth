import { mainApi } from "./main";

export type PostLoginInput = {
  username: string;
  password: string;
};

export type PostLoginResult = {
  data: {
    accessToken: string
  };
};

const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation<PostLoginResult, PostLoginInput>({
      query: (body) => ({
        url: "/auth/login",
        method: "post",
        body,
      }),
    }),
  }),
});

export const { usePostLoginMutation } = authApi;
