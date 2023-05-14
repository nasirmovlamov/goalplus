import { LoginDto, UserDto } from "@/context/AuthContext";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.goalplus.az/api",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem("accessToken")}`
        );
      }
      return headers;
    },
  }),
  tagTypes: ["payment"],
  endpoints: (builder) => ({
    proccedPayment: builder.mutation<
      any,
      {
        userId: string;
        amount: string;
      }
    >({
      query: ({ userId, amount }) => ({
        url: `/payments/request/player?userId=${userId}&amount=${amount}`,
        method: "GET",
      }),
    }),
  }),
});
