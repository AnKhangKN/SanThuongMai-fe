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

    resetCart: (state) => {
      state.products = [];
      state.total_item = 0;
    },

    removePurchasedItems: (state, action) => {
      const purchased = action.payload; // Array<{ productId, attributes }>
      state.products = state.products.filter((cartItem) => {
        return !purchased.some(
          (item) =>
            item.productId === cartItem.productId &&
            JSON.stringify(item.attributes) ===
              JSON.stringify(cartItem.attributes)
        );
      });

      state.total_item = state.products.length;
    },
  },
});

export const { updateCart, resetCart, removePurchasedItems } =
  cartSlice.actions;

export default cartSlice.reducer;
