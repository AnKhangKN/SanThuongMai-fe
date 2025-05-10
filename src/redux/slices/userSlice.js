import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  access_token: "",
  img: "",
  phone: "",
  wallet: "",
  isAdmin: false,
  isVendor: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    updateUser: (state, action) => {
      const {
        _id = "",
        user_name = "",
        email = "",
        images = "", // Đường dẫn ảnh từ backend
        access_token = "",
        phone = "",
        wallet = "",
        isAdmin = false,
        isVendor = false,
      } = action.payload;

      state.id = _id;
      state.name = user_name || email;
      state.email = email;

      state.img = images.includes("/")
        ? images
        : `${process.env.REACT_APP_API_URL}/avatar/${images}`;

      state.access_token = access_token;
      state.phone = phone;
      state.wallet = wallet;
      state.isAdmin = isAdmin;
      state.isVendor = isVendor;
    },

    resetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.img = "";
      state.access_token = "";
      state.phone = "";
      state.wallet = "";
      state.isAdmin = false;
      state.isVendor = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
