// src/hooks/useAuth.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as AuthServices from "../services/shared/AuthServices";
import * as ValidateToken from "../utils/tokenUtils";
import * as UserServices from "../services/customer/CartServices";
import { updateUser } from "../redux/slices/userSlice";
import { updateCart } from "../redux/slices/cartSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const token = await ValidateToken.getValidAccessToken();
        const res = await AuthServices.getDetailUser(token);
        const userData = res.data;

        dispatch(updateUser(userData));

        // Nếu là customer thì load giỏ hàng
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
      } catch (err) {
        console.log("useAuth error:", err);
      }
    };

    fetchAuthData();
  }, [dispatch]);
};

export default useAuth;
