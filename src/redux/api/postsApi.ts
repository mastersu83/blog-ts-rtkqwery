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
    getAllPosts: builder.query<
      { total: number; items: IPost[] },
      { currentPage: number; search: string }
    >({
      query: ({ currentPage, search }) => ({
        url: `posts`,
        params: {
          query: search ? search : "",
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
      query: ({ title, description, text, photoUrl }) => ({
        url: `posts`,
        method: "POST",
        body: {
          title,
          description,
          text,
          photoUrl: photoUrl ? photoUrl : "null",
        },
      }),
      invalidatesTags: [{ type: "Post" }],
    }),
    uploadFile: builder.mutation({
      async queryFn(file, _queryApi, _extraOptions, fetchWithBQ) {
        const formData = new FormData();
        formData.append("file", file[0]);
        const response = await fetchWithBQ({
          url: "posts/upload",
          method: "POST",
          body: formData,
        });
        if (response.error) throw response.error;
        return response.data
          ? { data: response.data }
          : { error: response.error };
      },
    }),
    editPost: builder.mutation<
      IPost,
      { data: CreatePostFormValuesType; postId: string }
    >({
      query: ({ data: { title, description, text, photoUrl }, postId }) => ({
        url: `posts/${postId}`,
        method: "PATCH",
        body: {
          title,
          description,
          text,
          photoUrl,
        },
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
    searchPost: builder.query<
      { total: number; items: IPost[] },
      { search: string; currentPage: number }
    >({
      query: ({ search, currentPage }) => ({
        url: `posts?query=${search}&limit=5`,
        page: currentPage,
        limit: 5,
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useGetOnePostQuery,
  useLazyGetOnePostQuery,
  useCreatePostMutation,
  useRemovePostMutation,
  useLazyGetAllUserPostsQuery,
  useLazyGetAllPostsQuery,
  useEditPostMutation,
  useUploadFileMutation,
  useGetAllPostsQuery,
} = postsApi;
