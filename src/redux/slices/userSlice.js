import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "", // <-- dùng "id" thay vì "_id" để thống nhất trong state
  fullName: "",
  email: "",
  img: "", // ảnh đại diện (avatar)
  phone: "",
  wallet: "",
  wishShops: [],
  wishProducts: [],
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
        wishShops = [],
        wishProducts = [],
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
      state.wishShops = wishShops;
      state.wishProducts = wishProducts;
      state.following = following;
      state.isAdmin = isAdmin;
      state.isVendor = isVendor;
    },

    resetUser: (state) => {
      Object.assign(state, initialState);
    },

    removeWishShop(state, action) {
      const shopId = action.payload;
      state.wishShops = state.wishShops.filter(
        (shop) => shop.shopId !== shopId
      );
    },
  },
});

export const { updateUser, resetUser, removeWishShop } = userSlice.actions;
export default userSlice.reducer;
