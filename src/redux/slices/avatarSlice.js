import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  img: "",
};

export const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    avatarUser: (state, action) => {
      const { images } = action.payload || {};
      state.img = images
        ? images.includes("/")
          ? images
          : `${process.env.REACT_APP_API_URL}/avatar/${images}`
        : "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { avatarUser } = avatarSlice.actions;

export default avatarSlice.reducer;
