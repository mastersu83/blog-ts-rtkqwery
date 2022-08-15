import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IComments } from "../../types/commentsType";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  tagTypes: ["Comment"],
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
    getAllComments: builder.query<IComments[], unknown>({
      query: () => ({
        url: `comments`,
        params: {
          limit: 5,
        },
      }),
      providesTags: ["Comment"],
      transformResponse(res: { items: IComments[]; total: number }) {
        return res.items;
      },
    }),
    getAllCommentsOnePost: builder.query<IComments[], string>({
      query: (id) => ({
        url: `comments/post/${id}`,
        params: {
          limit: 20,
        },
      }),
      providesTags: ["Comment"],
    }),
    getAllUserComments: builder.query<
      { items: IComments[]; total: number },
      string
    >({
      query: (id) => ({
        url: `comments?userId=${id}`,
        params: {
          limit: 20,
        },
      }),
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation<
      IComments[],
      { text: string; postId: string }
    >({
      query: ({ text, postId }) => ({
        url: `comments`,
        method: "POST",
        body: { text, postId },
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
    editComment: builder.mutation<
      IComments,
      { text: string; commentId: string }
    >({
      query: ({ text, commentId }) => ({
        url: `comments/${commentId}`,
        method: "PATCH",
        body: { text },
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
    removeComment: builder.mutation<IComments[], string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
  }),
});

export const {
  useGetAllCommentsOnePostQuery,
  useCreateCommentMutation,
  useRemoveCommentMutation,
  useGetAllUserCommentsQuery,
  useEditCommentMutation,
} = commentsApi;
