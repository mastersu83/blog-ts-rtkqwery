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
    getAllPosts: builder.query<{ total: number; items: IPost[] }, number>({
      query: (currentPage) => ({
        url: `posts`,
        params: {
          limit: 5,
          page: currentPage,
        },
      }),
      providesTags: ["Post"],
    }),
    getAllUserPosts: builder.query<
      { items: IPost[]; total: number },
      { userId: string; currentPage: number }
    >({
      query: ({ userId, currentPage }) => ({
        url: `posts?userId=${userId}`,
        params: {
          limit: 5,
          page: currentPage,
        },
      }),
      providesTags: ["Post"],
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
    editPost: builder.mutation<
      IPost,
      { data: CreatePostFormValuesType; postId: string }
    >({
      query: ({ data, postId }) => ({
        url: `posts/${postId}`,
        method: "PATCH",
        body: data,
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
  useCreatePostMutation,
  useRemovePostMutation,
  useLazyGetAllUserPostsQuery,
  useLazyGetAllPostsQuery,
  useEditPostMutation,
} = postsApi;
