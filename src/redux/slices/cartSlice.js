import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  total_item: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    updateCart: (state, action) => {
      const { products, total_item } = action.payload;
      state.products = products || [];
      state.total_item = total_item || 0;
    },

    // hoặc dùng:
    resetCart: (state) => {
      state.products = [];
      state.total_item = 0;
    },
  },
});

export const { updateCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
