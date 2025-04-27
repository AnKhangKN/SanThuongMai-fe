import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  access_token: "",
  img: "",
};

export const userSlide = createSlice({
  name: "user",
  initialState,

  reducers: {
    updateUser: (state, action) => {
      const { user_name, email, img, access_token } = action.payload;
      state.name = user_name || email;
      state.email = email;
      state.img = Array.isArray(img) && img.length > 0 ? img[0] : "";
      state.access_token = access_token;
    },

    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.img = "";
      state.access_token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
