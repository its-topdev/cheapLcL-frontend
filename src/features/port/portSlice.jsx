import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants/config";

export const portSlice = createApi({
  reducerPath: "apiport",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set("x-api-key", localStorage.getItem("token"));
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getPorts: builder.query({
        query() {
          return "port";
        },
      }),
      getPolsFromPrices: builder.query({
        query() {
          return "price/pol";
        },
      }),
      getPodsFromPrices: builder.query({
        query() {
          return "price/pod";
        },
      }),
    };
  },
});

export const {
  useGetPortsQuery,
  useGetPolsFromPricesQuery,
  useGetPodsFromPricesQuery,
} = portSlice;
