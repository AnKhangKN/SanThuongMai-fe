import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Giỏ hàng sẽ chứa một mảng các sản phẩm
  total_item: 0, // Tổng số lượng sản phẩm trong giỏ hàng
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
  },
});

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
