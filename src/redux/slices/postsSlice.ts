import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../types/postType";

type InitialStateType = {
  post: IPost;
  searchPost: IPost[];
  total: number;
};

const initialState: InitialStateType = {
  post: {} as IPost,
  searchPost: [],
  total: 0,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setEditPost: (state: InitialStateType, action: PayloadAction<IPost>) => {
      state.post = action.payload;
    },
    removeEditPost: (state: InitialStateType) => {
      state.post = {} as IPost;
    },
    setSearchPost: (
      state: InitialStateType,
      action: PayloadAction<{ items: IPost[]; total: number }>
    ) => {
      state.searchPost = action.payload.items;
    },
  },
});

export const { setEditPost, removeEditPost, setSearchPost } =
  postsSlice.actions;
