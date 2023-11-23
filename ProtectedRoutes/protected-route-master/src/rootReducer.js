import { createReducer } from "@reduxjs/toolkit";

export const rootReducer = createReducer(
  { isLogin: false },
  {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  }
);
