import { fetchBaseQuery } from "@reduxjs/toolkit/query";
export const privateBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: `http://localhost:3333`,
    prepareHeaders(headers) {
      const token = localStorage.getItem("access-token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    async responseHandler(response) {
      if (response.status === 401) {
        window.location.href = '/login'
      }

      return response.json();
    },
  });
