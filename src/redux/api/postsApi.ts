import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPost } from "../../types/postType";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5656/" }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], unknown>({
      query: () => ({
        url: `posts`,
        params: {
          limit: 7,
        },
      }),
      transformResponse(res: { items: IPost[]; total: number }) {
        return res.items;
      },
    }),
    getOnePost: builder.query<IPost, string>({
      query: (id) => ({
        url: `posts/${id}`,
      }),
    }),
  }),
});

export const { useGetAllPostsQuery, useGetOnePostQuery } = postsApi;
