import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/config';

export const carrierSlice = createApi({
  reducerPath: 'apicarrier',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('x-api-key', localStorage.getItem("token"));
      headers.set('Content-Type', "application/json");
      return headers;
    }
  }),
  endpoints(builder) {
    return {
      getCarriers: builder.query({
        query(){
          return 'carrier/list';
        }
      }),
    }
  }
});

export const { useGetCarriersQuery } = carrierSlice;