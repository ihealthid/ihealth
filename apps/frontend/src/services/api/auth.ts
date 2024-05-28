import { mainApi } from "./main";
import { User } from "./user";

export type PostLoginInput = {
  username: string;
  password: string;
};

export type PostLoginResult = {
  data: {
    accessToken: string;
    user: User;
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
