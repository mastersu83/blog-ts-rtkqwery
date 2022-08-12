import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../../types/usreType";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5656/auth/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        localStorage.getItem("token")
          ? String(localStorage.getItem("token"))
          : ""
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      IUser,
      {
        email: string;
        password: string;
      }
    >({
      query: ({ email, password }) => ({
        url: `login`,
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation<
      IUser,
      {
        email: string;
        password: string;
        fullName: string;
      }
    >({
      query: ({ email, password, fullName }) => ({
        url: `register`,
        method: "POST",
        body: { email, password, fullName },
      }),
    }),
    auth: builder.query<IUser, unknown>({
      query: () => ({
        url: `me`,
      }),
    }),
  }),
});

export const { useLazyAuthQuery, useLoginMutation, useRegisterMutation } =
  authApi;
