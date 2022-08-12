import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPost } from "../../types/postType";
import { CreatePostFormValuesType } from "../../types/formValueType";

export const postsApi = createApi({
  reducerPath: "postsApi",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5656/",
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
    getAllPosts: builder.query<IPost[], unknown>({
      query: () => ({
        url: `posts`,
        params: {
          limit: 20,
        },
      }),
      providesTags: ["Post"],
      transformResponse(res: { items: IPost[]; total: number }) {
        return res.items;
      },
    }),
    getAllUserPosts: builder.query<IPost[], string>({
      query: (id) => ({
        url: `posts?userId=${id}`,
        params: {
          limit: 20,
        },
      }),
      providesTags: ["Post"],
      transformResponse(res: { items: IPost[]; total: number }) {
        return res.items;
      },
    }),
    getOnePost: builder.query<IPost, string>({
      query: (id) => ({
        url: `posts/${id}`,
      }),
    }),
    createPost: builder.mutation<IPost, CreatePostFormValuesType>({
      query: ({ title, description, text, file }) => ({
        url: `posts`,
        method: "POST",
        body: { title, description, text, file },
      }),
      invalidatesTags: [{ type: "Post" }],
    }),
    removePost: builder.mutation<IPost, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Post" }],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetOnePostQuery,
  useLazyGetOnePostQuery,
  useCreatePostMutation,
  useRemovePostMutation,
  useGetAllUserPostsQuery,
} = postsApi;
