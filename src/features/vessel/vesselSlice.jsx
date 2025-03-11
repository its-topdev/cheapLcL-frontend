import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants/config";

export const vesselSlice = createApi({
  reducerPath: "apivessel",
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
      getVessels: builder.query({
        query() {
          return "vessel/list";
        },
      }),
    };
  },
});

export const { useGetVesselsQuery } = vesselSlice;
