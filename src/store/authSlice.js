import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  authStatus: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.userDetails = action.payload), (state.authStatus = true);
    },
    logout: (state) => {
      (state.userDetails = null), (state.authStatus = false);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
