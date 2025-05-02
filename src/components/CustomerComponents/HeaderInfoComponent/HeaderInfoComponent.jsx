import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartModal, CartWrapper, IconWrapper, SumCart } from "./style";

import Logo_Xoa_Phong from "../../../assets/images/Logo_Den-removebg-preview.png";
import SearchComponent from "../SearchComponent/SearchComponent";
import HeaderCategoryComponent from "../HeaderCategoryComponent/HeaderCategoryComponent";
import { Link } from "react-router-dom";
import anh from "../../../assets/images/Logo_Den.jpg";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as CartServices from "../../../services/customer/CartServices";

const HeaderInfoComponent = () => {
  const [cartItems, setCartItems] = useState([]);

  const decodeToken = () => {
    let storageToken = localStorage.getItem("access_token");
    if (storageToken && isJsonString(storageToken)) {
      const token = JSON.parse(storageToken);
      const decoded = jwtDecode(token);
      return { decoded, token };
    }
    return { decoded: null, token: null };
  };

  const fetchCartItems = useCallback(async () => {
    try {
      let { decoded, token } = decodeToken();

      if (!token || (decoded && decoded.exp < Date.now() / 1000)) {
        const refreshed = await AuthServices.refreshToken();
        token = refreshed?.access_token;
        localStorage.setItem("access_token", JSON.stringify(token));
      }

      const response = await CartServices.getAllItem(token);
      const data = response?.data[0]?.items || [];

      const items = data.map((item) => ({
        ...item,
        key: item._id || item.id,
        quantity: item.quantity < 1 ? 1 : item.quantity, // tránh lỗi quantity = 0
      }));

      setCartItems(items);
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <div
      style={{
        height: "85px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link
        to="/"
        style={{ display: "flex", color: "#fff", textDecoration: "none" }}
      >
        <div style={{ width: "65px" }}>
          <img
            src={Logo_Xoa_Phong}
            alt="logo"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div style={{ fontSize: "30px", padding: "20px 0px 0px 10px" }}>
          HKN
        </div>
      </Link>

      <div style={{ width: "100%", margin: "0px 30px 0px 60px" }}>
        <div>
          <SearchComponent />
        </div>
        <div style={{ margin: "8px 0px -12px 0px" }}>
          <HeaderCategoryComponent />
        </div>
      </div>

      {/* cart */}
      <CartWrapper>
        <IconWrapper>
          <AiOutlineShoppingCart />
          {/* Hiển thị tổng số lượng sản phẩm trong giỏ hàng */}
          <SumCart>{cartItems.length > 99 ? "99+" : cartItems.length}</SumCart>
        </IconWrapper>

        {/* modal cart */}
        <CartModal>
          <div>Sản phẩm trong giỏ hàng</div>

          {/* Hiển thị tối đa 5 sản phẩm */}
          {cartItems.slice(0, 5).map((item) => (
            <div
              key={item.key}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <div style={{ flex: "0 0 15%" }}>
                <div style={{ width: "40px", height: "40px" }}>
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src={item.image || anh}
                    alt={item.name}
                  />
                </div>
              </div>

              <div style={{ flex: "0 0 60%" }}>
                {item.name || "Tên sản phẩm"}
              </div>
              <div style={{ flex: "0 0 25%", textAlign: "end" }}>
                {(item.price || 0).toLocaleString()}đ
              </div>
            </div>
          ))}

          {/* Hiển thị nếu có hơn 5 sản phẩm */}
          {cartItems.length > 5 ? (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <Link to="/cart" style={{ fontSize: "14px", color: "#007bff" }}>
                <ButtonComponent
                  name={`Xem thêm ${cartItems.length - 5} sản phẩm`}
                />
              </Link>
            </div>
          ) : (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <Link to="/cart">
                <ButtonComponent name="Xem giỏ hàng" />
              </Link>
            </div>
          )}
        </CartModal>
      </CartWrapper>
    </div>
  );
};

export default HeaderInfoComponent;
