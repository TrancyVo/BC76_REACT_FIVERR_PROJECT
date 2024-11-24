import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).user
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handelUpdateUser: (state, action) => {
      console.log(state);
      console.log(action);
      state.user = action.payload;
    },
  },
});

export const { handelUpdateUser } = userSlice.actions;

export default userSlice.reducer;
