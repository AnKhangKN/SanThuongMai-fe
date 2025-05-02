import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productId: "",
  product_name: "",
  email: "",
  access_token: "",
  img: "",
  phone: "",
  isAdmin: false,
  isVendor: false,
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
