import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { stat } from "fs";

// Define a service using a base URL and expected endpoints
export const ticketingApi = createApi({
  reducerPath: "ticketingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.goalplus.az/api",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTicketTypes: builder.query<any, void>({
      query: () => ({
        url: `/ticket-types`,
        method: "GET",
      }),
    }),
    submitTicket: builder.mutation<any, any>({
      query: (body) => ({
        url: `/payments/request/visitor?ticketTypeId=${body.id}`,
        method: "POST",
        body: body.postData,
      }),
      transformResponse(response) {
        console.log("response", response);
        return response;
      },
      transformErrorResponse(error) {
        console.log("error", error);
        if (error.status === "PARSING_ERROR") {
          return { status: error.status, data: error.data };
        }
        return error;
      },
    }),
  }),
});
