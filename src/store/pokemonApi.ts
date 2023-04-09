import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type PokemonType = {
  name: string;
};

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<PokemonType, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});
