import { createSlice } from "@reduxjs/toolkit";
import {
  getCurUser,
  loginUser,
  refreshToken,
  registerUser,
} from "./authOperations";

const initialState = {
  idToken: null,
  email: null,
  refreshToken: null,
  localId: null,
  isLoading: false,
  error: null,
};

const setPending = (state) => {
  state.isLoading = true;
};

const setRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoOut() {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, setPending)
      .addCase(registerUser.rejected, setRejected)
      .addCase(loginUser.pending, setPending)
      .addCase(loginUser.rejected, setRejected)
      .addCase(getCurUser.pending, setPending)
      .addCase(getCurUser.rejected, setRejected)
      .addCase(refreshToken.pending, setPending)
      .addCase(refreshToken.rejected, setRejected)

      .addCase(registerUser.fulfilled, (_, { payload }) => {
        return {
          isLoading: false,
          error: null,
          isAuth: true,
          ...payload,
        };
      })
      .addCase(loginUser.fulfilled, (_, { payload }) => {
        return {
          isLoading: false,
          error: null,
          isAuth: true,
          ...payload,
        };
      })
      .addCase(getCurUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          error: null,
          ...payload,
        };
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          error: null,
          ...payload,
        };
      });
  },
});

export const { logoOut } = authSlice.actions;
export default authSlice.reducer;
