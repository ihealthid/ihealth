import { fetchBaseQuery } from "@reduxjs/toolkit/query";
export const privateBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: `http://192.168.1.10:3333`,
    prepareHeaders(headers) {
      const token = localStorage.getItem("access-token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    async responseHandler(response) {
      if (response.status === 401) {
        window.location.href = '/'
      }

      return response.json();
    },
  });
