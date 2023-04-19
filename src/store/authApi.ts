import { UserDto } from "@/context/AuthContext";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type PokemonType = {
  name: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  name: string;
  surname: string;
  fathername: string;
  email: string;
  gender: string;
  birthdate: string;
  idCard: File[];
  learnAboutUs: string;
  howLearnAboutUs: string;
  shirtSize: string;
  photo: string;
  jerseyNumber: string;
  playerPosition: string;
  approvesTermsAndConditions: string;
  areYourUniPayment: string;
  comments: string;
  sportType: string;
  // file
  schoolCertificate: File[];
  schoolLogo: File[];
  personalPhoto: File[];
  coach: {
    name: string;
    surname: string;
    email: string;
  };
  quote: string;
  teamLogo: File[];
  teamSlogan: string;
  schoolName: string;
  schoolOfficial: {
    name: string;
    surname: string;
    position: string;
    email: string;
    contactNumber: string;
  };
  comment: string;
  termsAndConditions: boolean;
  leagueType: string;
  isPaying: "institution" | "personal";
  institutionPaying?: {
    name: string;
    surname: string;
    position: string;
    email: string;
    contactNumber: string;
  };
  teamMembers: {
    name: string;
    surname: string;
    email: string;
    contactNumber: string;
  }[];
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

    register: builder.mutation<RegisterDto, RegisterDto>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "me", id: "LIST" }],
    }),
  }),
});
