import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  capturedImg: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setCapturedImg: (state, action) => {
      state.capturedImg = action.payload;
    },
    clearUser: () => initialState,
  },
});

export default userSlice;
export const { setCapturedImg, setEmail, setFullName, clearUser } =
  userSlice.actions;
