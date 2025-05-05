import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
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
    resetCheckout: (state) => {
      state.products = [];
    },
  },
});

export const { setCheckoutInfo, addProductToCheckout, resetCheckout } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
