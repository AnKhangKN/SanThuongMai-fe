import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";
import avatarSlice from "./slices/avatarSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer,
    checkout: checkoutSlice,
    avatar: avatarSlice,
  },
});
