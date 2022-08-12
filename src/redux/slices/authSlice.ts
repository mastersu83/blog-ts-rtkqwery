import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/usreType";

type InitialStateType = {
  user: IUser;
  isAuth: boolean;
};

const initialState: InitialStateType = {
  user: {} as IUser,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: InitialStateType, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      if (action.payload) {
        state.isAuth = true;
      }
    },
    logOut: (state: InitialStateType) => {
      state.user = {} as IUser;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
    loginUser: (state: InitialStateType) => {
      state.isAuth = true;
    },
  },
});

export const { setUser, logOut, loginUser } = authSlice.actions;
