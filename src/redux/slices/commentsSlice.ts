import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComments } from "../../types/commentsType";

type InitialStateType = {
  comment: IComments;
  isEdit: boolean;
};

const initialState: InitialStateType = {
  comment: {} as IComments,
  isEdit: false,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setEditComment: (
      state: InitialStateType,
      action: PayloadAction<IComments>
    ) => {
      state.comment = action.payload;
      state.isEdit = true;
    },
    removeEditComment: (state: InitialStateType) => {
      state.comment = {} as IComments;
      state.isEdit = false;
    },
  },
});

export const { setEditComment, removeEditComment } = commentsSlice.actions;
