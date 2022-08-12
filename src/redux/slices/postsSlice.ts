import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../types/postType";

type InitialStateType = {
  post: IPost;
  isEdit: boolean;
};

const initialState: InitialStateType = {
  post: {} as IPost,
  isEdit: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setEditPost: (state: InitialStateType, action: PayloadAction<IPost>) => {
      state.isEdit = false;
      state.post = action.payload;
      state.isEdit = true;
    },
    removeEditPost: (state: InitialStateType) => {
      state.post = {} as IPost;
      state.isEdit = false;
    },
  },
});

export const { setEditPost, removeEditPost } = postsSlice.actions;
