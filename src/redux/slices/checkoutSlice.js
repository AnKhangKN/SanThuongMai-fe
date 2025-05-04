import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // nên dùng "products" vì reducer đang cập nhật "products"
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutInfo: (state, action) => {
      const { products } = action.payload;
      state.products = products || [];
    },
    addProductToCheckout: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { setCheckoutInfo, addProductToCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
