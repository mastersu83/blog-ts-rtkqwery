import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./api/postsApi";
import { commentsApi } from "./api/commentsApi";
import { authApi } from "./api/authApi";
import { authSlice } from "./slices/authSlice";
import { postsSlice } from "./slices/postsSlice";
import { commentsSlice } from "./slices/commentsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    post: postsSlice.reducer,
    comment: commentsSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postsApi.middleware,
      commentsApi.middleware,
      authApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
