import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IComments } from "../../types/commentsType";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5656/" }),
  endpoints: (builder) => ({
    getAllComments: builder.query<IComments[], unknown>({
      query: () => ({
        url: `comments`,
        params: {
          limit: 5,
        },
      }),
      transformResponse(res: { items: IComments[]; total: number }) {
        return res.items;
      },
    }),
    getAllCommentsOnePost: builder.query<IComments[], string>({
      query: (id) => ({
        url: `comments/post/${id}`,
        params: {
          limit: 5,
        },
      }),
    }),
  }),
});

export const { useGetAllCommentsQuery, useGetAllCommentsOnePostQuery } =
  commentsApi;
