import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/usreType";

type InitialStateType = {
  user: IUser;
  isAuth: boolean;
};

const defaultUser = {
  _id: "",
  fullName: "",
  email: "",
  createdAt: "",
  updatedAt: "",
  __v: 0,
};

const initialState: InitialStateType = {
  user: {
    _id: "",
    fullName: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
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
      state.user = defaultUser;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
