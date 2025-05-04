import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer,
    checkout: checkoutSlice,
  },
});
