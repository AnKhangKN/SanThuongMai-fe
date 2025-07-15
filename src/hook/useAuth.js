// src/hooks/useAuth.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import * as AuthServices from "../services/shared/AuthServices";
import * as ValidateToken from "../utils/tokenUtils";
import * as UserServices from "../services/customer/CartServices";

import { updateUser } from "../redux/slices/userSlice";
import { updateCart } from "../redux/slices/cartSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  // Mutation: lấy thông tin user
  const authMutation = useMutation({
    mutationFn: async () => {
      const token = await ValidateToken.getValidAccessToken();
      const res = await AuthServices.getDetailUser(token);
      return { userData: res.data, token };
    },
    onSuccess: async ({ userData, token }) => {
      dispatch(updateUser(userData));

      // Nếu là customer → lấy giỏ hàng
      if (!userData.isAdmin && !userData.isVendor) {
        const cartRes = await UserServices.getAllItem(token);
        const userCart = cartRes.data?.[0];

        if (userCart) {
          dispatch(
            updateCart({
              products: userCart.productItems || [],
              total_item: userCart.productItems?.length || 0,
            })
          );
        }
      }
    },
    onError: (err) => {
      console.log("useAuth error:", err);
    },
  });

  // Chạy auth khi hook mount
  useEffect(() => {
    authMutation.mutate();
  }, [dispatch]);

  return {
    isLoading: authMutation.isLoading,
    isError: authMutation.isError,
    isSuccess: authMutation.isSuccess,
    error: authMutation.error,
  };
};

export default useAuth;
