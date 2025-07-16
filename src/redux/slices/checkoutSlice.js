import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  vouchers: [], // Lưu danh sách voucher được áp dụng
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutInfo: (state, action) => {
      const { products, vouchers } = action.payload;
      state.products = products || [];
      state.vouchers = vouchers || [];
    },
    addProductToCheckout: (state, action) => {
      state.products.push(action.payload); // chỉ thêm sản phẩm
    },
    addVoucherToCheckout: (state, action) => {
      // kiểm tra trùng trước khi thêm
      const exists = state.vouchers.find(
        (voucher) => voucher._id === action.payload._id
      );
      if (!exists) {
        state.vouchers.push(action.payload);
      }
    },
    removeVoucherFromCheckout: (state, action) => {
      // loại bỏ voucher theo id
      state.vouchers = state.vouchers.filter(
        (voucher) => voucher._id !== action.payload
      );
    },
    resetCheckout: (state) => {
      state.products = [];
      state.vouchers = [];
    },
  },
});

export const {
  setCheckoutInfo,
  addProductToCheckout,
  resetCheckout,
  addVoucherToCheckout,
  removeVoucherFromCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
