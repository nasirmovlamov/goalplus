import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type PokemonType = {
  name: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type UserDto = {
  email: string;
  password: string;
  id: string;
};

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://61ae2fa9a7c7f3001786f6e6.mockapi.io/users-backend",
  }),
  tagTypes: ["me"],
  endpoints: (builder) => ({
    me: builder.query<UserDto, void>({
      query: () => `me`,
      providesTags: (result, error, id) => [{ type: "me", id: "LIST" }],
    }),

    login: builder.mutation<UserDto, LoginDto>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "me", id: "LIST" }],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: `logout`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "me", id: "LIST" }],
    }),
  }),
});
