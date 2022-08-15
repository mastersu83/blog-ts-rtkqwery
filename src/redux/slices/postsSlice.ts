import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../types/postType";

type InitialStateType = {
  post: IPost;
};

const initialState: InitialStateType = {
  post: {} as IPost,
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
  },
});

export const { setEditPost, removeEditPost } = postsSlice.actions;
