import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartModal, CartWrapper, IconWrapper, SumCart } from "./style";
import Logo_Xoa_Phong from "../../../assets/images/Logo_Den-removebg-preview.png";
import SearchComponent from "../SearchComponent/SearchComponent";
import { Link } from "react-router-dom";
import anh from "../../../assets/images/Logo_Den.jpg";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useSelector } from "react-redux";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const HeaderInfoComponent = () => {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.products;

  return (
    <div
      style={{
        height: "85px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
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

      {/* Search + Category */}
      <div style={{ width: "100%", margin: "0px 30px 0px 60px" }}>
        <div>
          <SearchComponent />
        </div>
      </div>

      {/* Cart */}
      <CartWrapper>
        <IconWrapper>
          <AiOutlineShoppingCart />
          <SumCart>{cart.total_item > 99 ? "99+" : cart.total_item}</SumCart>
        </IconWrapper>

        {/* Modal Cart */}
        <CartModal>
          <div>Sản phẩm trong giỏ hàng</div>

          {/* Hiển thị tối đa 5 sản phẩm */}
          {cartItems.slice(0, 5).map((item) => (
            <div
              key={item.productId}
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
                    src={`${imageURL}${item.productImage}` || anh}
                    alt=""
                  />
                </div>
              </div>

              <div style={{ flex: "0 0 60%" }}>
                {item.productName || "Tên sản phẩm"}
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
