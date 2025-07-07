import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "", // <-- dùng "id" thay vì "_id" để thống nhất trong state
  fullName: "",
  email: "",
  img: "", // ảnh đại diện (avatar)
  phone: "",
  wallet: "",
  wishlist: [],
  following: "",
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
        fullName = "",
        email = "",
        avatar = "", // <-- avatar field từ backend
        phone = "",
        wallet = "",
        wishlist = [],
        following = "",
        isAdmin = false,
        isVendor = false,
      } = action.payload;

      state.id = _id;
      state.fullName = fullName || email;
      state.email = email;

      // Kiểm tra avatar path an toàn
      if (typeof avatar === "string" && avatar.includes("/")) {
        state.img = avatar;
      } else {
        state.img = avatar
          ? `${process.env.REACT_APP_API_URL}/avatar/${avatar}`
          : "";
      }

      state.phone = phone;
      state.wallet = wallet;
      state.wishlist = wishlist;
      state.following = following;
      state.isAdmin = isAdmin;
      state.isVendor = isVendor;
    },

    resetUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
